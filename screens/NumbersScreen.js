import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const numbers = {
  '1-10': [
    { english: '1', kannada: 'ಒಂದು', pronunciation: 'Ondu' },
    { english: '2', kannada: 'ಎರಡು', pronunciation: 'Eradu' },
    { english: '3', kannada: 'ಮೂರು', pronunciation: 'Mooru' },
    { english: '4', kannada: 'ನಾಲ್ಕು', pronunciation: 'Nalku' },
    { english: '5', kannada: 'ಐದು', pronunciation: 'Aidu' },
    { english: '6', kannada: 'ಆರು', pronunciation: 'Aaru' },
    { english: '7', kannada: 'ಏಳು', pronunciation: 'ELu' },
    { english: '8', kannada: 'ಎಂಟು', pronunciation: 'EnTu' },
    { english: '9', kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu' },
    { english: '10', kannada: 'ಹತ್ತು', pronunciation: 'Hattu' },
  ],
  '11-20': [
    { english: '11', kannada: 'ಹನ್ನೊಂದು', pronunciation: 'Hannondu' },
    { english: '12', kannada: 'ಹನ್ನೆರಡು', pronunciation: 'Hanneradu' },
    { english: '13', kannada: 'ಹದಿಮೂರು', pronunciation: 'Hadimooru' },
    { english: '14', kannada: 'ಹದಿನಾಲ್ಕು', pronunciation: 'Hadinalku' },
    { english: '15', kannada: 'ಪದಿನೈದು', pronunciation: 'Padinainu' },
    { english: '16', kannada: 'ಹದಿನಾರು', pronunciation: 'Hadināru' },
    { english: '17', kannada: 'ಹದಿನೇಳು', pronunciation: 'Hadinēḷu' },
    { english: '18', kannada: 'ಹದಿನೆಂಟು', pronunciation: 'Hadinenṭu' },
    { english: '19', kannada: 'ಹತ್ತೊಂಬತ್ತು', pronunciation: 'Hattombattu' },
    { english: '20', kannada: 'ಇಪ್ಪತ್ತು', pronunciation: 'Ippattu' },
  ],
  '21-50': [
    { english: '21', kannada: 'ಇಪ್ಪತ್ತೊಂದು', pronunciation: 'Ippattondu' },
    { english: '30', kannada: 'ಮೂವತ್ತು', pronunciation: 'Mūvattu' },
    { english: '40', kannada: 'ನಲವತ್ತು', pronunciation: 'Nalavattu' },
    { english: '50', kannada: 'ಐವತ್ತು', pronunciation: 'Aivattu' },
  ],
  '51-100': [
    { english: '51', kannada: 'ಐವತ್ತೊಂದು', pronunciation: 'Aivattondhu' },
    { english: '60', kannada: 'ಅರವತ್ತು', pronunciation: 'Aravattu' },
    { english: '70', kannada: 'ಎಪ್ಪತ್ತು', pronunciation: 'Eppattu' },
    { english: '80', kannada: 'ಎಂಬತ್ತು', pronunciation: 'Embattu' },
    { english: '90', kannada: 'ತೊಂಬತ್ತು', pronunciation: 'Thombattu' },
    { english: '100', kannada: 'ನೂರು', pronunciation: 'Nooru' },
  ]
};

const NumbersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FF3333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Numbers</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <ScrollView style={styles.content}>
        {Object.entries(numbers).map(([range, numberList]) => (
          <View key={range} style={styles.section}>
            <Text style={styles.sectionTitle}>{range}</Text>
            <View style={styles.numbersGrid}>
              {numberList.map((number, index) => (
                <View key={`${range}-${index}`} style={styles.numberCard}>
                  <Text style={styles.englishNumber}>{number.english}</Text>
                  <Text style={styles.kannadaNumber}>{number.kannada}</Text>
                  <Text style={styles.pronunciation}>{number.pronunciation}</Text>
                </View>
              ))}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  numberCard: {
    width: (width - 60) / 3,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  englishNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3333',
  },
  kannadaNumber: {
    fontSize: 24,
    marginVertical: 5,
    color: '#333',
  },
  pronunciation: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default NumbersScreen;
