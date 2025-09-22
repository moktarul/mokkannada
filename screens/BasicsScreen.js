import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const basics = {
  pronouns: [
    { english: 'I', kannada: 'ನಾನು', pronunciation: 'Naanu' },
    { english: 'You', kannada: 'ನೀನು', pronunciation: 'Neenu' },
    { english: 'He', kannada: 'ಅವನು', pronunciation: 'Avanu' },
    { english: 'She', kannada: 'ಅವಳು', pronunciation: 'AvaLu' },
    { english: 'We', kannada: 'ನಾವು', pronunciation: 'Naavu' },
    { english: 'They', kannada: 'ಅವರು', pronunciation: 'Avaru' },
  ],
  days: [
    { english: 'Sunday', kannada: 'ಭಾನುವಾರ', pronunciation: 'Bhaanuvaara' },
    { english: 'Monday', kannada: 'ಸೋಮವಾರ', pronunciation: 'Somavaara' },
    { english: 'Tuesday', kannada: 'ಮಂಗಳವಾರ', pronunciation: 'Mangalavaara' },
    { english: 'Wednesday', kannada: 'ಬುಧವಾರ', pronunciation: 'Budhavaara' },
    { english: 'Thursday', kannada: 'ಗುರುವಾರ', pronunciation: 'Guruvaara' },
    { english: 'Friday', kannada: 'ಶುಕ್ರವಾರ', pronunciation: 'Shukravaara' },
    { english: 'Saturday', kannada: 'ಶನಿವಾರ', pronunciation: 'Shanivaara' },
  ],
  months: [
    { english: 'January', kannada: 'ಜನವರಿ', pronunciation: 'Janavari' },
    { english: 'February', kannada: 'ಫೆಬ್ರವರಿ', pronunciation: 'February' },
    { english: 'March', kannada: 'ಮಾರ್ಚ್', pronunciation: 'March' },
    { english: 'April', kannada: 'ಏಪ್ರಿಲ್', pronunciation: 'April' },
    { english: 'May', kannada: 'ಮೇ', pronunciation: 'May' },
    { english: 'June', kannada: 'ಜೂನ್', pronunciation: 'June' },
    { english: 'July', kannada: 'ಜುಲೈ', pronunciation: 'July' },
    { english: 'August', kannada: 'ಆಗಸ್ಟ್', pronunciation: 'August' },
    { english: 'September', kannada: 'ಸೆಪ್ಟೆಂಬರ್', pronunciation: 'September' },
    { english: 'October', kannada: 'ಅಕ್ಟೋಬರ್', pronunciation: 'October' },
    { english: 'November', kannada: 'ನವೆಂಬರ್', pronunciation: 'November' },
    { english: 'December', kannada: 'ಡಿಸೆಂಬರ್', pronunciation: 'December' },
  ],
};

const BasicsScreen = () => {
  const navigation = useNavigation();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showKannada, setShowKannada] = useState(true);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderCategory = (title, data, category) => (
    <View style={styles.categoryContainer} key={category}>
      <TouchableOpacity 
        style={styles.categoryHeader}
        onPress={() => toggleCategory(category)}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <MaterialIcons 
          name={expandedCategory === category ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={24} 
          color="#555" 
        />
      </TouchableOpacity>
      
      {expandedCategory === category && (
        <View style={styles.categoryContent}>
          {data.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.englishContainer}>
                <Text style={styles.englishText}>{item.english}</Text>
                <Text style={styles.pronunciation}>{item.pronunciation}</Text>
              </View>
              <Text style={styles.kannadaText}>
                {showKannada ? item.kannada : item.pronunciation}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FF3333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Basics</Text>
        <TouchableOpacity 
          onPress={() => setShowKannada(!showKannada)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {showKannada ? 'Kannada' : 'Transliteration'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {renderCategory('Pronouns', basics.pronouns, 'pronouns')}
        {renderCategory('Days of the Week', basics.days, 'days')}
        {renderCategory('Months', basics.months, 'months')}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    padding: 5,
  },
  toggleText: {
    color: '#FF3333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  categoryContainer: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryContent: {
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  englishContainer: {
    flex: 1,
  },
  englishText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pronunciation: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  kannadaText: {
    fontSize: 18,
    color: '#FF3333',
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'right',
  },
});

export default BasicsScreen;
