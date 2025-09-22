import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ConversationBubble = ({ 
  message, 
  isRightAligned = false, 
  showName = true,
  showEnglish = true,
  showKannada = true,
  senderName = '',
  onPress 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View 
        style={[
          styles.messageContainer, 
          isRightAligned ? styles.rightMessageContainer : styles.leftMessageContainer
        ]}
      >
        {showName && !isRightAligned && senderName ? (
          <Text style={styles.senderName}>{senderName}</Text>
        ) : null}
        
        <View 
          style={[
            styles.messageBubble, 
            isRightAligned ? styles.rightMessageBubble : styles.leftMessageBubble
          ]}
        >
          {showKannada && (message.text || message.kannada) && (
            <Text style={isRightAligned ? styles.rightMessageText : styles.leftMessageText}>
              {message.text || message.kannada}
            </Text>
          )}
          
          {showEnglish && message.english && message.english !== (message.text || message.kannada) && (
            <Text style={[
              styles.englishTranslation,
              !showKannada && { marginTop: 0 } // Adjust spacing if only one language is shown
            ]}>
              {message.english}
            </Text>
          )}
          
          {message.timestamp && (
            <Text style={[
              styles.timestamp,
              isRightAligned ? styles.rightTimestamp : styles.leftTimestamp
            ]}>
              {formatTime(message.timestamp)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 8,
    maxWidth: '85%',
  },
  rightMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  leftMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rightMessageBubble: {
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 4,
  },
  leftMessageBubble: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
  },
  rightMessageText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'KannadaSangamMN-Bold',
    textAlign: 'right',
  },
  leftMessageText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'KannadaSangamMN-Bold',
    textAlign: 'left',
  },
  englishTranslation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  rightTimestamp: {
    textAlign: 'right',
  },
  leftTimestamp: {
    textAlign: 'left',
  },
});

export default ConversationBubble;
