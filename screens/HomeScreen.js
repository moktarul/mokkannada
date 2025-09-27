import { Feather, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Colors
const COLORS = {
  primary: '#FF3333',
  secondary: '#FF6B6B',
  accent: '#4CAF50',
  background: '#F8F9FA',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6C757D',
  lightGray: '#E9ECEF',
};

// Navigation Cards Data
const navCards = [
  {
    id: 'lessons',
    title: 'Lessons',
    description: 'Learn basic to advanced Kannada',
    icon: 'book',
    color: '#FF6B6B',
    screen: 'LessonList',
  },
  {
    id: 'conversations',
    title: 'Conversations',
    description: 'Practice speaking with a friend',
    icon: 'chat',
    color: '#9C27B0',
    screen: 'ConversationList',
  },
  {
    id: 'conversation-practice',
    title: 'AI Practice',
    description: 'Practice with AI in real scenarios',
    icon: 'robot',
    color: '#2196F3',
    screen: 'ConversationPractice',
  },
  {
    id: 'basics',
    title: 'Basics',
    description: 'Essential words and phrases',
    icon: 'language',
    color: '#4CAF50',
    screen: 'Basics',
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Learn to count in Kannada',
    icon: 'sort-numeric-up',
    color: '#2196F3',
    screen: 'Numbers',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderNavCard = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.navCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.8}
    >
      <View style={styles.cardIconContainer}>
        {item.id === 'lessons' && (
          <Feather name={item.icon} size={32} color="white" />
        )}
        {item.id === 'conversations' && (
          <MaterialIcons name={item.icon} size={32} color="white" />
        )}
        {item.id === 'basics' && (
          <MaterialIcons name={item.icon} size={32} color="white" />
        )}
        {item.id === 'numbers' && (
          <FontAwesome5 name={item.icon} size={28} color="white" style={{ marginTop: 2 }} />
        )}
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="white" style={{ opacity: 0.9 }} />
    </TouchableOpacity>
  );

  // Main Content
  const MainContent = () => (
    <View style={styles.mainContent}>
      <Text style={styles.sectionTitle}>What would you like to learn?</Text>
      
      <View style={styles.cardsContainer}>
        {navCards.map((item) => renderNavCard(item))}
      </View>
      
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"A different language is a different vision of life."</Text>
        <Text style={styles.quoteAuthor}>- Federico Fellini</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/images/header.jpg')}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentWrapper}>
          <MainContent />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  headerContainer: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingBottom: 30,
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginHorizontal: 0,
  },
  headerContent: {
    position: 'relative',
    zIndex: 2,
    marginBottom: 15,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
    fontFamily: 'KannadaSangamMN-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  flagIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
    marginRight: 10,
  },
  mainContent: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 25,
  },
  cardsContainer: {
    marginBottom: 30,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  quoteContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  englishTranslation: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    padding: 5,
  },
  featureText: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.black,
    fontWeight: '500',
  },
  flagStripe: {
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
  redStripe: {
    backgroundColor: COLORS.red,
    top: 0,
  },
  yellowStripe: {
    backgroundColor: COLORS.yellow,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmblemContainer: {
    position: 'absolute',
    top: -20,
  },
  flagEmblem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  personImageWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiPersonImage: {
    width: 150,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ translateY: -10 }],
    zIndex: 10,
  },
  speechEffect: {
    position: 'absolute',
    right: -30,
    top: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  speechWave: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.red,
    marginVertical: 2,
    position: 'absolute',
  },
  wave1: {
    right: 5,
    animationName: 'wave1',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
  },
  wave2: {
    right: 12,
    animationName: 'wave2',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationDelay: '0.2s',
  },
  wave3: {
    right: 19,
    animationName: 'wave3',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationDelay: '0.4s',
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  speechText: {
    color: COLORS.red,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  character: {
    alignItems: 'center',
    marginBottom: 15,
  },
  characterHead: {
    width: 100,
    height: 100,
    backgroundColor: '#FFD5B0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  characterEyes: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  characterEye: {
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    marginHorizontal: 10,
  },
  characterSmile: {
    width: 40,
    height: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#333',
    overflow: 'hidden',
    alignItems: 'center',
  },
  characterMouth: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  speechLines: {
    position: 'absolute',
    right: -60,
    top: '40%',
    width: 50,
  },
  speechLine: {
    height: 2,
    backgroundColor: '#333',
    marginVertical: 3,
    borderRadius: 2,
  },
  speechLine1: { width: '60%', marginLeft: '40%' },
  speechLine2: { width: '80%', marginLeft: '20%' },
  speechLine3: { width: '100%' },
  languageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerContent: {
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  toggleText: {
    color: 'white',
    marginRight: 10,
    fontSize: 14,
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  toggleButtonActive: {
    backgroundColor: 'white',
  },
  toggleButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  toggleButtonTextActive: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  flagStripes: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  stripe: {
    flex: 1,
  },
  emblem: {
    width: 60,
    height: 60,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: 2,
    fontFamily: 'KannadaSangamMN-Bold',
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    maxWidth: '90%',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.red,
  },
  tabText: {
    marginLeft: 5,
    color: COLORS.red,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  lessonLevel: {
    fontSize: 14,
    color: COLORS.red,
    backgroundColor: 'rgba(255, 51, 51, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  categoryContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  basicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  englishText: {
    width: '25%',
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  kannadaText: {
    width: '35%',
    fontSize: 16,
    color: COLORS.red,
    textAlign: 'left',
    fontWeight: '500',
  },
  pronunciationText: {
    width: '40%',
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    fontStyle: 'italic',
    paddingRight: 10,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  numberRangeContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rangeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  numberCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  numberContent: {
    flex: 1,
  },
  numberKannada: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.red,
    marginLeft: 10,
  },
  numberEnglish: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 3,
  },
});

export default HomeScreen;
