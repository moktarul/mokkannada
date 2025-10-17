<?php
// server/tts.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$config = [
    'api_key' => 'AIzaSyDKRBKBOw2w4NCNP5dlyGd3WNT0d3iaL2g', // Replace with your actual API key
    'cache_dir' => __DIR__ . '/cache',
    'base_url' => 'http://104.248.202.152/kn/asset/',
    'tts_url' => 'https://texttospeech.googleapis.com/v1/text:synthesize',
];

// Create cache directory if it doesn't exist
if (!file_exists($config['cache_dir'])) {
    mkdir($config['cache_dir'], 0755, true);
}

// Get the text from the request
$text = $_GET['text'] ?? $_POST['text'] ?? '';
$language = $_GET['language'] ?? $_POST['language'] ?? 'kn-IN';
$voice = $_GET['voice'] ?? $_POST['voice'] ?? 'kn-IN-Chirp3-HD-Achernar';

if (empty($text)) {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided']);
    exit;
}

// Sanitize the text to create a safe filename
$filename = md5($text . $language . $voice) . '.mp3';
$filepath = $config['cache_dir'] . '/' . $filename;
$publicUrl = $config['base_url'] . 'cache/' . $filename;

// Check if the file already exists
if (file_exists($filepath)) {
    // Return the URL to the existing file
    echo json_encode([
        'audioUrl' => $publicUrl,
        'cached' => true
    ]);
    exit;
}

// If we get here, we need to generate the TTS
try {
    // Prepare the request data
    $postData = json_encode([
        'input' => ['text' => $text],
        'voice' => [
            'languageCode' => $language,
            'name' => $voice
        ],
        'audioConfig' => [
            'audioEncoding' => 'MP3',
            'speakingRate' => 0.85,
            'pitch' => 0
        ]
    ]);

    // Initialize cURL
    $ch = curl_init($config['tts_url'] . '?key=' . $config['api_key']);
    
    // Set cURL options
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $postData
    ]);

    // Execute the request
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($httpCode !== 200) {
        throw new Exception('API request failed: ' . $error);
    }

    $data = json_decode($response, true);
    
    if (isset($data['audioContent'])) {
        // Decode the base64 audio content
        $audioData = base64_decode($data['audioContent']);
        
        // Save to cache
        if (file_put_contents($filepath, $audioData) === false) {
            throw new Exception('Failed to save audio file');
        }
        
        // Return the URL to the new file
        echo json_encode([
            'audioUrl' => $publicUrl,
            'cached' => false
        ]);
    } else {
        throw new Exception('No audio content in response');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to generate speech',
        'message' => $e->getMessage()
    ]);
}

// Function to clean up old files (optional)
function cleanupOldFiles($dir, $maxAge = 2592000) { // 30 days
    $files = glob($dir . '/*.mp3');
    $now = time();
    
    foreach ($files as $file) {
        if (is_file($file) && ($now - filemtime($file) >= $maxAge)) {
            unlink($file);
        }
    }
}

// Run cleanup once in a while (1% chance on each request)
if (mt_rand(1, 100) === 1) {
    cleanupOldFiles($config['cache_dir']);
}