import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Load lessons from JSON files
    const loadLessons = async () => {
      try {
        const lesson1 = require('../assets/lesson/lesson1.json');
        const lesson2 = require('../assets/lesson/lesson2.json');
        const lesson3 = require('../assets/lesson/lesson3.json');
        const lesson4 = require('../assets/lesson/lesson4.json');
        const lesson5 = require('../assets/lesson/lesson5.json');
        
        setLessons([
          { ...lesson1, id: '1' },
          { ...lesson2, id: '2' },
          { ...lesson3, id: '3' },
          { ...lesson4, id: '4' },
          { ...lesson5, id: '5' }
        ]);
      } catch (error) {
        console.error('Error loading lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  const navigateToLesson = (lesson) => {
    navigation.navigate('LessonDetail', { lesson });
  };

  const navigateToQuiz = (lesson) => {
    navigation.navigate('Quiz', { lesson });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FF3333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Kannada Learning Path</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Start with the basics and build your Kannada skills</Text>
      
      {lessons.map((lesson, index) => (
        <View key={lesson.id} style={styles.lessonCard}>
          <View style={styles.lessonHeader}>
            <View style={styles.lessonNumber}>
              <Text style={styles.lessonNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title || `Lesson ${lesson.lesson}`}</Text>
              <Text style={styles.lessonDescription}>
                {lesson.description || `Learn essential Kannada ${index === 0 ? 'greetings and introductions' : index === 1 ? 'vocabulary and phrases' : 'conversation and grammar'}`}
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <MaterialIcons name="chat" size={16} color="#666" />
                  <Text style={styles.statText}>{lesson.conversations?.length || 3} Conversations</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialIcons name="menu-book" size={16} color="#666" />
                  <Text style={styles.statText}>
                    {lesson.vocabulary ? 
                      (typeof lesson.vocabulary === 'object' ? 
                        Object.keys(lesson.vocabulary).length : 
                        lesson.vocabulary.length) 
                      : 15} Words
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.learnButton]}
              onPress={() => navigateToLesson(lesson)}
            >
              <MaterialIcons name="play-circle-outline" size={18} color="white" />
              <Text style={styles.buttonText}>Learn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.quizButton]}
              onPress={() => navigateToQuiz(lesson)}
            >
              <MaterialIcons name="quiz" size={18} color="#FF3333" />
              <Text style={[styles.buttonText, {color: '#FF3333'}]}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FF3333',
    fontSize: 16,
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3333',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  learnButton: {
    backgroundColor: '#FF3333',
    marginRight: 8,
  },
  quizButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF3333',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
});

export default LessonList;
