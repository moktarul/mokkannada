import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  Platform
} from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons';

const contexts = [
  { id: 'taxi', emoji: '🚕', name: 'Auto Driver' },
  { id: 'vegetable', emoji: '🥦', name: 'Vegetable Shop' },
  { id: 'clinic', emoji: '🏥', name: 'Doctor\'s Clinic' },
  { id: 'restaurant', emoji: '🍽️', name: 'Restaurant' },
];

const roleOptions = [
  { id: 'customer', label: 'Be Customer', description: 'You speak Kannada, AI plays shopkeeper' },
  { id: 'provider', label: 'Be Service Provider', description: 'AI is the customer, you play shopkeeper/driver' },
];

// Enhanced conversation bank with more natural dialogues and English translations
const conversationBank = {
  taxi: {
    customer: [
      { 
        role: 'ai', 
        text: 'ನಮಸ್ಕಾರ ಸಾರ್, ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?', 
        english: 'Hello sir, where would you like to go?',
        suggestions: ['ಮೈಸೂರು ರೋಡ್ಗೆ (To Mysore Road)', 'ರಾಜಾಜಿನಗರ (To Rajajinagar)', 'ನಿಲ್ದಾಣಕ್ಕೆ (To the station)']
      },
      { 
        role: 'ai', 
        text: 'ಸರಿ ಸಾರ್, 250 ರೂಪಾಯಿ ಆಗುತ್ತದೆ. ಟ್ರಾಫಿಕ್ ಹೆಚ್ಚು ಇದೆ.', 
        english: 'Okay sir, it will be 250 rupees. There is heavy traffic.'
      },
      { 
        role: 'ai', 
        text: 'ತಲುಪಿದ್ದೇವೆ ಸಾರ್. ಒಟ್ಟು 280 ರೂಪಾಯಿ ಆಯ್ತು.', 
        english: 'We have arrived sir. The total is 280 rupees.'
      },
    ],
    provider: [
      { 
        role: 'ai', 
        text: 'ನಮಸ್ಕಾರ ಸಾರ್, ಈಗ ಎಲ್ಲಿಂದ ಬಂದ್ರಿ?', 
        english: 'Hello sir, where are you coming from now?',
        suggestions: ['ನಾನು ಬೆಂಗಳೂರಿನಿಂದ ಬಂದಿದ್ದೇನೆ (I came from Bangalore)', 'ನಾನು ಇಲ್ಲೇ ಸುತ್ತಮುತ್ತಲೇ ಇದ್ದೇನೆ (I am from nearby)']
      },
      { 
        role: 'ai', 
        text: 'ಇಲ್ಲಿಗೆ ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಹೋಗಿ. ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.', 
        english: 'Go slowly here. Stop here.'
      },
      { 
        role: 'ai', 
        text: 'ಇದು ಹಣ, ಬಾಕಿ ಇದೆಯೇ?', 
        english: 'Here is the money, is there any change?'
      },
    ]
  },
  vegetable: {
    customer: [
      {
        role: 'ai',
        text: 'ನಮಸ್ಕಾರ, ಈ ದಿನಕ್ಕೆ ಏನು ತರಲಿ?',
        english: 'Hello, what should I get today?',
        suggestions: ['ಒಂದು ಕೆ.ಜಿ ಟೊಮೇಟೊ (1kg tomatoes)', 'ಎರಡು ಕೆ.ಜಿ ಬದನೆ (2kg brinjal)', 'ಒಂದು ಕೆ.ಜಿ ಆಲೂಗಡ್ಡೆ (1kg potato)']
      },
      {
        role: 'ai',
        text: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?',
        english: 'How much does this cost?'
      },
      {
        role: 'ai',
        text: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಬೆಲೆ ಮಾಡಿ ದಯವಿಟ್ಟು',
        english: 'Please reduce the price a little'
      }
    ],
    provider: [
      {
        role: 'ai',
        text: 'ಬನ್ನಿ ಮಾಡಿ, ತಾಜಾ ತರಕಾರಿಗಳು ಬಂದಿವೆ. ಏನು ಬೇಕು?',
        english: 'Please come, fresh vegetables have arrived. What do you need?',
        suggestions: ['ಇವುಗಳ ಬೆಲೆ ಎಷ್ಟು? (How much are these?)', 'ಒಂದು ಕೆ.ಜಿ ಕ್ಯಾರೆಟ್ ಕೊಡಿ (Give me 1kg carrots)']
      },
      {
        role: 'ai',
        text: 'ಟೊಮೇಟೊ ಕಿಲೋ 40 ರೂಪಾಯಿ, ಮಡಿಕೇರಿ ಕೋಸು ಕಿಲೋ 30 ರೂಪಾಯಿ',
        english: 'Tomatoes are 40 rupees per kg, Cabbage is 30 rupees per kg'
      },
      {
        role: 'ai',
        text: 'ಮತ್ತೆ ಬನ್ನಿ, ಧನ್ಯವಾದಗಳು!',
        english: 'Come again, thank you!'
      }
    ]
  },
  restaurant: {
    customer: [
      {
        role: 'ai',
        text: 'ಮೆನು ಕಾರ್ಡ್ ತೋರಿಸಿ ದಯವಿಟ್ಟು',
        english: 'Please show me the menu',
        suggestions: ['ಇವತ್ತಿನ ಸ್ಪೆಷಲ್ ಏನಿದೆ? (What is today\'s special?)', 'ಎರಡು ಜನಕ್ಕೆ ಟೇಬಲ್ ಬೇಕು (I need a table for two)']
      },
      {
        role: 'ai',
        text: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಒಂದು ಕಾಫಿ ತರಿ',
        english: 'Get me one masala dosa and one coffee'
      },
      {
        role: 'ai',
        text: 'ಬಿಲ್ ಕೊಡಿ',
        english: 'Give me the bill'
      }
    ],
    provider: [
      {
        role: 'ai',
        text: 'ಸ್ವಾಗತ! ಎಷ್ಟು ಜನ?',
        english: 'Welcome! How many people?',
        suggestions: ['ಒಬ್ಬರಿಗೆ (For one)', 'ಎರಡು ಜನ (Two people)']
      },
      {
        role: 'ai',
        text: 'ಇವತ್ತಿನ ಸ್ಪೆಷಲ್ ಬಿಸಿಬೇಳೆ-ಭಾತ್ ಮತ್ತು ಸಾಂಬಾರ್',
        english: 'Today\'s special is bisi bele bath and sambar'
      },
      {
        role: 'ai',
        text: 'ಒಟ್ಟು 250 ರೂಪಾಯಿ ಆಗುತ್ತದೆ. ಮತ್ತೆ ಬನ್ನಿ!',
        english: 'The total is 250 rupees. Please come again!'
      }
    ]
  },
  clinic: {
    customer: [
      {
        role: 'ai',
        text: 'ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಜ್ವರ ಬಂದಿದೆ',
        english: 'I have a headache and fever',
        suggestions: ['ನಾನು ಎರಡು ದಿನದಿಂದ ಅನಾರೋಗ್ಯದಲ್ಲಿದ್ದೇನೆ (I have been unwell for two days)', 'ನನ್ನ ಹೊಟ್ಟೆ ನೋಯುತ್ತಿದೆ (I have stomach ache)']
      },
      {
        role: 'ai',
        text: 'ನೀವು ಯಾವ ಮಾತ್ರೆ ಕೊಟ್ಟಿರಿ?',
        english: 'What medicine did you prescribe?'
      },
      {
        role: 'ai',
        text: 'ಧನ್ಯವಾದಗಳು ಡಾಕ್ಟರ್',
        english: 'Thank you doctor'
      }
    ],
    provider: [
      {
        role: 'ai',
        text: 'ನಿಮಗೆ ಏನಾದರೂ ಆಲರ್ಜಿ ಇದೆಯೇ?',
        english: 'Do you have any allergies?',
        suggestions: ['ಇಲ್ಲ (No)', 'ಹೌದು, ಪೆನ್ಸಿಲಿನ್ಗೆ ಆಲರ್ಜಿ ಇದೆ (Yes, allergic to penicillin)']
      },
      {
        role: 'ai',
        text: 'ನೀವು ಮೂರು ದಿನ ಈ ಮಾತ್ರೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ',
        english: 'Take these medicines for three days'
      },
      {
        role: 'ai',
        text: 'ನಾಳೆ ನನ್ನನ್ನು ಮತ್ತೆ ಭೇಟಿ ಮಾಡಿ',
        english: 'Visit me again tomorrow'
      }
    ]
  }
};

export default function ConversationPractice({ navigation }) {
  // Set navigation options
  React.useEffect(() => {
    navigation.setOptions({
      title: 'AI Practice',
      headerStyle: {
        backgroundColor: '#FF3333',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  const [selectedContext, setSelectedContext] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  const recording = useRef(null);
  const helpTimer = useRef(null);

  // Start a new conversation
  const startConversation = () => {
    if (!selectedContext || !selectedRole) return;
    
    const initialMessages = conversationBank[selectedContext][selectedRole];
    if (initialMessages && initialMessages.length > 0) {
      setConversation([initialMessages[0]]); // Start with first AI message
      speak(initialMessages[0].text);
    }
    
    // Start help timer (5-10 seconds)
    helpTimer.current = setTimeout(() => {
      showSuggestedReplies();
    }, 7000);
  };

  // Text-to-speech
  const speak = (text) => {
    Speech.speak(text, {
      language: 'kn-IN', // Kannada
      onDone: () => console.log('Speech completed'),
      onError: (error) => console.error('Speech error:', error),
    });
  };

  // Handle user response
  const handleUserResponse = (text) => {
    if (!text.trim()) return;
    
    // Clear help timer
    if (helpTimer.current) {
      clearTimeout(helpTimer.current);
      helpTimer.current = null;
    }
    
    // Add user message to conversation
    const userMessage = {
      role: 'user',
      text: text,
      timestamp: new Date().toISOString(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setUserInput('');
    
    // Simulate AI response (in a real app, this would call an API)
    generateAIResponse([...conversation, userMessage]);
  };
  
  // Generate AI response (simplified for demo)
  const generateAIResponse = (conversationHistory) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const contextMessages = conversationBank[selectedContext][selectedRole];
      const nextAiMessage = contextMessages[conversationHistory.length % contextMessages.length];
      
      setConversation(prev => [...prev, nextAiMessage]);
      speak(nextAiMessage.text);
      setIsLoading(false);
      
      // Restart help timer
      helpTimer.current = setTimeout(() => {
        showSuggestedReplies();
      }, 7000);
      
    }, 1000);
  };
  
  // Show suggested replies when user is stuck
  const showSuggestedReplies = () => {
    if (conversation.length === 0) return;
    
    // Get the last AI message
    const lastAiMessage = [...conversation].reverse().find(msg => msg.role === 'ai');
    if (!lastAiMessage) return;
    
    // Get context-specific suggestions if available, otherwise use default ones
    let suggestions = [];
    
    // Check if we have predefined suggestions for this message
    if (lastAiMessage.suggestions && lastAiMessage.suggestions.length > 0) {
      suggestions = lastAiMessage.suggestions;
    } else {
      // Fallback to general suggestions
      suggestions = [
        'ಹೌದು (Yes)',
        'ಇಲ್ಲ (No)',
        'ದಯವಿಟ್ಟು ಪುನಃ ಹೇಳಿ (Please say that again)',
        'ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ (I understand)',
        'ಇನ್ನಷ್ಟು ವಿವರಿಸಿ (Explain more)'
      ];
    }
    
    setSuggestedReplies(suggestions);
    setShowHelp(true);
  };
  
  // Handle speech recognition result
  const handleSpeechResult = (result) => {
    if (result && result[0]) {
      handleUserResponse(result[0]);
    }
  };
  
  // Start/stop recording
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      try {
        await recording.current.stopAndUnloadAsync();
        const uri = recording.current.getURI();
        // In a real app, send the audio to a speech-to-text API
        // For now, we'll just use a placeholder
        handleSpeechResult(['Your spoken text would appear here']);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        recording.current = newRecording;
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', 'Could not start recording. Please check permissions.');
      }
    }
  };
  
  // End the conversation and show feedback
  const endConversation = () => {
    // In a real app, analyze the conversation for mistakes, pronunciation, etc.
    setFeedback({
      correct: ['You used some great phrases!'],
      mistakes: [
        { original: 'ನನಗೆ ಹಸಿವಾಗಿದೆ', corrected: 'ನನಗೆ ಹಸಿದಿದೆ', explanation: 'Correct way to say "I am hungry"' }
      ],
      score: 85,
    });
    
    // Clear any active timers
    if (helpTimer.current) {
      clearTimeout(helpTimer.current);
      helpTimer.current = null;
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (helpTimer.current) {
        clearTimeout(helpTimer.current);
      }
      if (recording.current) {
        recording.current.stopAndUnloadAsync();
      }
      Speech.stop();
    };
  }, []);

  // Render context selection
  if (!selectedContext) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select a Context</Text>
        <ScrollView contentContainerStyle={styles.grid}>
          {contexts.map((context) => (
            <TouchableOpacity
              key={context.id}
              style={styles.contextCard}
              onPress={() => setSelectedContext(context.id)}
            >
              <Text style={styles.emoji}>{context.emoji}</Text>
              <Text style={styles.contextName}>{context.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
  
  // Render role selection
  if (!selectedRole) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Role</Text>
        <View style={styles.roleContainer}>
          {roleOptions.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              onPress={() => setSelectedRole(role.id)}
            >
              <Text style={styles.roleLabel}>{role.label}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedContext(null)}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Render conversation
  return (
    <View style={styles.container}>
      <View style={styles.conversationContainer}>
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          ref={(ref) => {
            if (ref) {
              setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
            }
          }}
        >
          {conversation.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.instructions}>
                Press the microphone button to start speaking. The AI will respond to you in Kannada.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={startConversation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.startButtonText}>Start Conversation</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            conversation.map((message, index) => (
              <View
                key={`${message.role}-${index}`}
                style={[
                  styles.messageBubble,
                  message.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
                {message.english && (
                  <Text style={styles.englishTranslation}>({message.english})</Text>
                )}
              </View>
            ))
          )}
          
          {isLoading && (
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <ActivityIndicator size="small" color="#666" />
            </View>
          )}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your response..."
            placeholderTextColor="#999"
            onSubmitEditing={() => handleUserResponse(userInput)}
          />
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={toggleRecording}
          >
            <MaterialIcons
              name={isRecording ? 'stop' : 'mic'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleUserResponse(userInput)}
            disabled={!userInput.trim()}
          >
            <MaterialIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {conversation.length > 0 && (
          <TouchableOpacity
            style={styles.endButton}
            onPress={endConversation}
          >
            <Text style={styles.endButtonText}>End Conversation</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Help Modal */}
      <Modal
        visible={showHelp}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHelp(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.helpModal}>
            <Text style={styles.helpTitle}>Need help responding?</Text>
            <Text style={styles.helpSubtitle}>Try one of these:</Text>
            
            <ScrollView style={styles.suggestionsContainer}>
              {suggestedReplies.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionButton}
                  onPress={() => {
                    handleUserResponse(suggestion);
                    setShowHelp(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeHelpButton}
              onPress={() => setShowHelp(false)}
            >
              <Text style={styles.closeHelpButtonText}>I'll try myself</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Feedback Modal */}
      <Modal
        visible={!!feedback}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFeedback(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackModal}>
            <Text style={styles.feedbackTitle}>Conversation Complete!</Text>
            <Text style={styles.feedbackScore}>Your Score: {feedback?.score}%</Text>
            
            <View style={styles.feedbackSection}>
              <Text style={styles.feedbackSectionTitle}>✅ Correct Phrases:</Text>
              {feedback?.correct.map((item, index) => (
                <Text key={index} style={styles.feedbackItem}>
                  • {item}
                </Text>
              ))}
            </View>
            
            <View style={styles.feedbackSection}>
              <Text style={styles.feedbackSectionTitle}>❌ Mistakes:</Text>
              {feedback?.mistakes?.length > 0 ? (
                feedback.mistakes.map((mistake, index) => (
                  <View key={index} style={styles.mistakeItem}>
                    <Text style={styles.mistakeOriginal}>
                      <Text style={{ fontWeight: 'bold' }}>You said:</Text> {mistake.original}
                    </Text>
                    <Text style={styles.mistakeCorrected}>
                      <Text style={{ fontWeight: 'bold' }}>Correct:</Text> {mistake.corrected}
                    </Text>
                    <Text style={styles.mistakeExplanation}>
                      {mistake.explanation}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noMistakes}>Great job! No mistakes found.</Text>
              )}
            </View>
            
            <View style={styles.feedbackButtons}>
              <TouchableOpacity
                style={[styles.feedbackButton, styles.feedbackButtonPrimary]}
                onPress={() => {
                  setFeedback(null);
                  setSelectedContext(null);
                  setSelectedRole(null);
                  setConversation([]);
                }}
              >
                <Text style={styles.feedbackButtonText}>Try Another</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.feedbackButton, styles.feedbackButtonSecondary]}
                onPress={() => {
                  setFeedback(null);
                  setConversation([]);
                  startConversation();
                }}
              >
                <Text style={[styles.feedbackButtonText, { color: '#4a90e2' }]}>
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  contextCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  contextName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  conversationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a90e2',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  englishTranslation: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
  },
  recordButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  recordingButton: {
    backgroundColor: '#e74c3c',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#e74c3c',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  helpModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  helpSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  suggestionsContainer: {
    maxHeight: 200,
    marginBottom: 16,
  },
  suggestionButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  closeHelpButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeHelpButtonText: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '500',
  },
  feedbackModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  feedbackScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 24,
  },
  feedbackSection: {
    marginBottom: 24,
  },
  feedbackSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  feedbackItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  mistakeItem: {
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  mistakeOriginal: {
    color: '#e74c3c',
    marginBottom: 4,
  },
  mistakeCorrected: {
    color: '#27ae60',
    marginBottom: 4,
  },
  mistakeExplanation: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  noMistakes: {
    color: '#27ae60',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  feedbackButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  feedbackButtonPrimary: {
    backgroundColor: '#4a90e2',
  },
  feedbackButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
