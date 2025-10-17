// utils/tts.js
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const TTS_SERVER_URL = 'http://104.248.202.152/kn/asset/tts.php';
let currentSound = null;

/**
 * Speaks the given Kannada text using the server-side TTS with caching
 * @param {string} kannadaText - The text to be spoken in Kannada
 * @returns {Promise<void>}
 */
export const speakKannada = async (kannadaText) => {
  try {
    // Stop any currently playing sound
    if (currentSound) {
      await stopSpeaking();
    }

    // Call the server to get the audio URL
    const response = await fetch(TTS_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(kannadaText)}`
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.message || 'Failed to generate speech');
    }

    // Play the audio from the server
    const { sound } = await Audio.Sound.createAsync(
      { uri: data.audioUrl },
      { shouldPlay: true }
    );

    currentSound = sound;
    
    // Set up playback status updates
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await sound.unloadAsync();
        currentSound = null;
      }
    });
    
    return sound;
  } catch (error) {
    console.error('Error with server TTS, falling back to device TTS:', error);
    // Fallback to device TTS
    return new Promise((resolve, reject) => {
      Speech.speak(kannadaText, {
        language: 'kn-IN',
        onDone: () => resolve(),
        onError: (e) => reject(e),
      });
    });
  }
};

/**
 * Stops any currently playing speech
 * @returns {Promise<void>}
 */
export const stopSpeaking = async () => {
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch (error) {
      console.error('Error stopping speech:', error);
    } finally {
      currentSound = null;
    }
  }
};

/**
 * Checks if speech is currently playing
 * @returns {boolean}
 */
export const isSpeaking = () => {
  return currentSound !== null;
};

// No need for clearTTSCache on the client side anymore
// as caching is now handled by the server