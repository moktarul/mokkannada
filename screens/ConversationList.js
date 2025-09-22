import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [userName, setUserName] = useState('You');
  const [friendName, setFriendName] = useState('Friend');
  const [isEditing, setIsEditing] = useState(false);

  // Sample conversation data
  useEffect(() => {
    const sampleConversations = [
      {
        id: '1',
        title: 'Greetings',
        preview: 'Hello! How are you?',
        messages: [
          { id: '1', sender: 'friend', text: 'Hello! How are you?', english: 'Hello! How are you?' },
          { id: '2', sender: 'user', text: 'ನನಗೆ ಚೆನ್ನಾಗಿದೆ, ಧನ್ಯವಾದಗಳು!', english: 'I am fine, thank you!' },
          { id: '3', sender: 'friend', text: 'ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ?', english: 'What are you doing?' },
        ]
      },
      {
        id: '2',
        title: 'At the Restaurant',
        preview: 'I would like to order...',
        messages: [
          { id: '1', sender: 'friend', text: 'ನಾನು ಆರ್ಡರ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ', english: 'I would like to order' },
          { id: '2', sender: 'user', text: 'ನೀವು ಏನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಿ?', english: 'What would you like to have?' },
        ]
      },
      {
        id: '3',
        title: 'Shopping',
        preview: 'How much does this cost?',
        messages: [
          { id: '1', sender: 'user', text: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', english: 'How much does this cost?' },
          { id: '2', sender: 'friend', text: 'ಇದು ೫೦೦ ರೂಪಾಯಿ', english: 'It is 500 rupees' },
        ]
      },
    ];
    setConversations(sampleConversations);
  }, []);

  const handleNameSave = () => {
    // Save names to state or async storage
    setIsEditing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ConversationDetail', { 
        conversation: item,
        userName,
        friendName
      })}
    >
      <View style={styles.conversationIcon}>
        <MaterialIcons name="chat-bubble" size={24} color="#FF3333" />
      </View>
      <View style={styles.conversationContent}>
        <Text style={styles.conversationTitle}>{item.title}</Text>
        <Text style={styles.conversationPreview} numberOfLines={1}>{item.preview}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversations</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <MaterialIcons name="edit" size={24} color="#FF3333" />
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <View style={styles.nameInputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Your Name:</Text>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Friend's Name:</Text>
            <TextInput
              style={styles.input}
              value={friendName}
              onChangeText={setFriendName}
              placeholder="Enter friend's name"
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleNameSave}>
            <Text style={styles.saveButtonText}>Save Names</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  conversationIcon: {
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
    marginRight: 12,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  conversationPreview: {
    fontSize: 14,
    color: '#666',
  },
  nameInputContainer: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FF3333',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConversationList;
