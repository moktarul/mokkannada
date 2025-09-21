import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Button from '../components/Button';
import SvgImage from '../components/SvgImage';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLearning = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to learning screen
      // navigation.navigate('Learning');
    }, 1000);
  };

  const handlePractice = () => {
    // Navigate to practice screen
    // navigation.navigate('Practice');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>Kannada Speaking App</Text>
          <Text style={styles.subtitle}>Learn and practice Kannada language with interactive lessons</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <SvgImage width="100%" height={200} />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Start Learning"
            onPress={handleStartLearning}
            loading={isLoading}
            style={styles.primaryButton}
          />
          
          <Button 
            title="Practice Speaking"
            onPress={handlePractice}
            variant="outline"
            style={styles.practiceButton}
          />
          
          <Button 
            title="View Progress"
            onPress={() => {}}
            variant="secondary"
            style={styles.secondaryButton}
          />
        </View>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Interactive Lessons</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎙️</Text>
            <Text style={styles.featureText}>Voice Recognition</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Track Progress</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  primaryButton: {
    marginBottom: 15,
    height: 50,
  },
  practiceButton: {
    marginBottom: 15,
    height: 50,
  },
  secondaryButton: {
    marginBottom: 15,
    height: 50,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  feature: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});

export default HomeScreen;
