import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LessonDetail = ({ route, navigation }) => {
  const { lesson } = route.params;
  const [activeTab, setActiveTab] = useState('conversations');

  const renderConversation = (conversation) => {
    const lines = conversation.lines || conversation.turns || [];
    
    return (
      <View key={conversation.id || conversation.title} style={styles.conversationContainer}>
        {conversation.title && (
          <Text style={styles.conversationTitle}>{conversation.title}</Text>
        )}
        
        {lines.map((line, index) => {
          const speaker = line.speaker || (typeof line === 'object' ? Object.keys(line)[0] : '');
          const text = line.kannada || (typeof line === 'object' ? line[speaker] : line);
          const english = line.english || '';
          
          return (
            <View key={index} style={styles.conversationLine}>
              {speaker && (
                <View style={styles.speakerContainer}>
                  <Text style={styles.speaker}>{speaker}:</Text>
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.kannadaText}>{text}</Text>
                {english && <Text style={styles.englishText}>{english}</Text>}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderVocabulary = () => {
    if (!lesson.vocabulary) return null;
    
    const vocabList = Array.isArray(lesson.vocabulary)
      ? lesson.vocabulary
      : Object.entries(lesson.vocabulary).map(([kannada, english]) => ({ kannada, english }));
    
    return (
      <View style={styles.vocabContainer}>
        <Text style={styles.sectionTitle}>Vocabulary</Text>
        <View style={styles.vocabList}>
          {vocabList.map((item, index) => (
            <View key={index} style={styles.vocabItem}>
              <Text style={styles.kannadaText}>{item.kannada}</Text>
              <Text style={styles.englishText}>{item.english}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderExercises = () => {
    if (!lesson.exercises) return null;
    
    return (
      <View style={styles.exercisesContainer}>
        <Text style={styles.sectionTitle}>Exercises</Text>
        {Array.isArray(lesson.exercises) ? (
          lesson.exercises.map((exercise, index) => (
            <View key={index} style={styles.exercise}>
              <Text style={styles.exerciseTitle}>Exercise {index + 1}</Text>
              <Text style={styles.exerciseInstruction}>{exercise.instruction}</Text>
              {exercise.items && (
                <View style={styles.exerciseItems}>
                  {exercise.items.map((item, i) => (
                    <View key={i} style={styles.exerciseItem}>
                      <Text style={styles.exerciseQuestion}>
                        {item.q || item.input || item.question}
                      </Text>
                      <Text style={styles.exerciseAnswer}>
                        {item.answer || item.output_model || item.modelAnswer}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          Object.entries(lesson.exercises).map(([key, exercise]) => (
            <View key={key} style={styles.exercise}>
              <Text style={styles.exerciseTitle}>Exercise {key}</Text>
              <Text style={styles.exerciseInstruction}>{exercise.instruction}</Text>
              {exercise.items && (
                <View style={styles.exerciseItems}>
                  {Object.entries(exercise.items).map(([subKey, item], i) => (
                    <View key={i} style={styles.exerciseItem}>
                      {Array.isArray(item) ? (
                        <View>
                          <Text style={styles.exerciseQuestion}>{subKey}:</Text>
                          {item.map((subItem, j) => (
                            <Text key={j} style={styles.exerciseAnswer}>• {subItem.q || subItem}</Text>
                          ))}
                        </View>
                      ) : typeof item === 'object' ? (
                        <View>
                          <Text style={styles.exerciseQuestion}>{item.q || item.input || ''}</Text>
                          <Text style={styles.exerciseAnswer}>{item.answer || item.output_model || ''}</Text>
                        </View>
                      ) : (
                        <Text style={styles.exerciseAnswer}>{item}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {lesson.title || `Lesson ${lesson.lesson}`}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'conversations' && styles.activeTab]}
          onPress={() => setActiveTab('conversations')}
        >
          <MaterialIcons 
            name="chat" 
            size={20} 
            color={activeTab === 'conversations' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'conversations' && styles.activeTabText]}>
            Conversations
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vocabulary' && styles.activeTab]}
          onPress={() => setActiveTab('vocabulary')}
        >
          <MaterialIcons 
            name="menu-book" 
            size={20} 
            color={activeTab === 'vocabulary' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'vocabulary' && styles.activeTabText]}>
            Vocabulary
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'exercises' && styles.activeTab]}
          onPress={() => setActiveTab('exercises')}
        >
          <MaterialIcons 
            name="assignment" 
            size={20} 
            color={activeTab === 'exercises' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'exercises' && styles.activeTabText]}>
            Exercises
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'conversations' && (
          <View style={styles.conversationsContainer}>
            {lesson.conversations?.map(renderConversation)}
          </View>
        )}
        
        {activeTab === 'vocabulary' && renderVocabulary()}
        
        {activeTab === 'exercises' && renderExercises()}
      </ScrollView>

      <TouchableOpacity 
        style={styles.quizButton}
        onPress={() => navigation.navigate('Quiz', { lesson })}
      >
        <MaterialIcons name="quiz" size={24} color="white" />
        <Text style={styles.quizButtonText}>Take Quiz</Text>
      </TouchableOpacity>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 24, // To balance with the back button
  },
  headerRight: {
    width: 40, // Same as back button for balance
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF3333',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  activeTabText: {
    color: '#FF3333',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  conversationsContainer: {
    marginBottom: 20,
  },
  conversationContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conversationLine: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  speakerContainer: {
    width: 60,
  },
  speaker: {
    fontWeight: '600',
    color: '#FF3333',
  },
  textContainer: {
    flex: 1,
  },
  kannadaText: {
    fontSize: 16,
    fontFamily: 'KannadaSangamMN-Bold',
    color: '#333',
    lineHeight: 24,
  },
  englishText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  vocabContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  vocabList: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  vocabItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  exercisesContainer: {
    marginBottom: 20,
  },
  exercise: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  exerciseInstruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  exerciseItems: {
    marginTop: 8,
  },
  exerciseItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  exerciseQuestion: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  exerciseAnswer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3333',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quizButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default LessonDetail;
