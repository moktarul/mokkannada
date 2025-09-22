import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Karnataka flag colors
const COLORS = {
  red: '#FF3333',
  yellow: '#FFFF00',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F0F0F0',
};

// Sample data
const lessons = [
  { id: 1, title: 'Greetings', level: 'Beginner' },
  { id: 2, title: 'Common Phrases', level: 'Beginner' },
  { id: 3, title: 'Food & Dining', level: 'Intermediate' },
  { id: 4, title: 'Shopping', level: 'Intermediate' },
  { id: 5, title: 'Travel', level: 'Advanced' },
];

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

const StartLearningButton = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.startLearningButton}
      onPress={() => navigation.navigate('LessonList')}
    >
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <MaterialIcons name="school" size={24} color="white" />
        <Text style={styles.startLearningText}>Start Learning Kannada</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('lessons');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showKannadaChars, setShowKannadaChars] = useState(true);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // AI-generated image of a person speaking Kannada with creative flag integration
  const SpeakingPerson = () => (
    <View style={styles.personContainer}>
      {/* Flag colors as background elements */}
      <View style={[styles.flagStripe, styles.redStripe]} />
      <View style={[styles.flagStripe, styles.yellowStripe]}>
        <View style={styles.flagEmblemContainer}>
          <Svg width="40" height="40" viewBox="0 0 100 100" style={styles.flagEmblem}>
            <Circle cx="50" cy="50" r="45" fill={COLORS.red} stroke="#000" strokeWidth="1.5"/>
            <Path d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill={COLORS.yellow} stroke="#000" strokeWidth="1"/>
          </Svg>
        </View>
      </View>
      
      {/* Main person image */}
      <View style={styles.personImageWrapper}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1594744803329-e58b31de8a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' }}
          style={styles.aiPersonImage}
          resizeMode="cover"
        />
        
        {/* Speech animation effect */}
        <View style={styles.speechEffect}>
          <View style={[styles.speechDot, styles.speechDot1]} />
          <View style={[styles.speechDot, styles.speechDot2]} />
          <View style={[styles.speechDot, styles.speechDot3]} />
        </View>
        
        {/* Speech bubble with Kannada text */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>ನಾನು ಕನ್ನಡ ಮಾತನಾಡುತ್ತೇನೆ</Text>
        </View>
      </View>
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* App Title and Tagline */}
        <View style={styles.headerText}>
          <Text style={styles.appName}>ಕನ್ನಡ ಕಲಿಯಿರಿ</Text>
          <Text style={styles.headerTitle}>Speak Kannada with Confidence</Text>
          <Text style={styles.headerSubtitle}>Start speaking like a local from day one!</Text>
        </View>
        
        {/* Character and Speech Bubble Container */}
        <View style={styles.characterSpeechContainer}>
          {/* Speech Bubble */}
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>ನಾನು ಕನ್ನಡ ಮಾತನಾಡುತ್ತೇನೆ!</Text>
            <View style={styles.speechTail}></View>
          </View>
          
          {/* Character */}
          <View style={styles.character}>
            {/* Head */}
            <View style={styles.characterHead}>
              {/* Eyes */}
              <View style={styles.characterEyes}>
                <View style={styles.characterEye}></View>
                <View style={styles.characterEye}></View>
              </View>
              {/* Smile */}
              <View style={styles.characterSmile}>
                <View style={styles.characterMouth}></View>
              </View>
              
              {/* Speech Animation */}
              <View style={styles.speechEffect}>
                <View style={[styles.speechWave, styles.wave1]}></View>
                <View style={[styles.speechWave, styles.wave2]}></View>
                <View style={[styles.speechWave, styles.wave3]}></View>
              </View>
            </View>
            
            {/* Body */}
            <View style={styles.characterBody}>
              <View style={styles.characterShirt}></View>
            </View>
          </View>
          
          {/* Language Display */}
          <View style={styles.languageContainer}>
            <Text style={styles.kannadaPhrase}>"ನಾನು ಕನ್ನಡ ಮಾತನಾಡುತ್ತೇನೆ!"</Text>
            <Text style={styles.englishTranslation}>(I speak Kannada!)</Text>
          </View>
        </View>
        
        {/* App Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <MaterialIcons name="mic" size={24} color={COLORS.red} />
            <Text style={styles.featureText}>Speak</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="headset" size={24} color={COLORS.red} />
            <Text style={styles.featureText}>Listen</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="translate" size={24} color={COLORS.red} />
            <Text style={styles.featureText}>Learn</Text>
          </View>
        </View>
      </View>
      
      {activeTab === 'basics' || activeTab === 'numbers' ? (
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Show Kannada Script:</Text>
          <TouchableOpacity 
            style={[styles.toggleButton, showKannadaChars && styles.toggleButtonActive]}
            onPress={() => setShowKannadaChars(true)}
          >
            <Text style={[styles.toggleButtonText, showKannadaChars && styles.toggleButtonTextActive]}>
              ON
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !showKannadaChars && styles.toggleButtonActive]}
            onPress={() => setShowKannadaChars(false)}
          >
            <Text style={[styles.toggleButtonText, !showKannadaChars && styles.toggleButtonTextActive]}>
              OFF
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'lessons':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Lessons</Text>
            {lessons.map((lesson) => (
              <View key={lesson.id} style={styles.card}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={styles.lessonFooter}>
                  <Text style={styles.lessonLevel}>{lesson.level}</Text>
                  <MaterialIcons name="arrow-forward-ios" size={16} color={COLORS.red} />
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'basics':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Basics</Text>
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('pronouns')}
            >
              <Text style={styles.categoryTitle}>Pronouns</Text>
              <MaterialIcons 
                name={expandedCategory === 'pronouns' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color={COLORS.black} 
              />
            </TouchableOpacity>
            {expandedCategory === 'pronouns' && (
              <View style={styles.categoryContent}>
                {basics.pronouns.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>
                      {showKannadaChars ? item.kannada : item.pronunciation}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('days')}
            >
              <Text style={styles.categoryTitle}>Days of the Week</Text>
              <MaterialIcons 
                name={expandedCategory === 'days' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color={COLORS.black} 
              />
            </TouchableOpacity>
            {expandedCategory === 'days' && (
              <View style={styles.categoryContent}>
                {basics.days.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>
                      {showKannadaChars ? item.kannada : item.pronunciation}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('months')}
            >
              <Text style={styles.categoryTitle}>Months</Text>
              <MaterialIcons 
                name={expandedCategory === 'months' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color={COLORS.black} 
              />
            </TouchableOpacity>
            {expandedCategory === 'months' && (
              <View style={styles.categoryContent}>
                {basics.months.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>
                      {showKannadaChars ? item.kannada : item.pronunciation}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
        
      case 'numbers':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Numbers</Text>
            {Object.entries(numbers).map(([range, numberList]) => (
              <View key={range} style={styles.numberRangeContainer}>
                <Text style={styles.rangeTitle}>{range}</Text>
                <View style={styles.numbersGrid}>
                  {numberList.map((number, index) => (
                    <View key={`${range}-${index}`} style={styles.numberCard}>
                      <View style={styles.numberContent}>
                        <Text style={styles.numberEnglish}>{number.english}</Text>
                        <Text style={styles.pronunciationText}>
                          {showKannadaChars ? number.kannada : number.pronunciation}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );
        
      default:
        return (
          <View style={styles.container}>
            <Header />
            <ScrollView>
              <View style={styles.contentContainer}>
                <SpeakingPerson />
                <StartLearningButton />
                {renderContent()}
              </View>
            </ScrollView>
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'lessons':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Lessons</Text>
            {lessons.map((lesson) => (
              <View key={lesson.id} style={styles.card}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={styles.lessonFooter}>
                  <Text style={styles.lessonLevel}>{lesson.level}</Text>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="#FF3333" />
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'basics':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Basics</Text>
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('pronouns')}
            >
              <Text style={styles.categoryTitle}>Pronouns</Text>
              <MaterialIcons 
                name={expandedCategory === 'pronouns' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color="#000" 
              />
            </TouchableOpacity>
            {expandedCategory === 'pronouns' && (
              <View style={styles.categoryContent}>
                {basics.pronouns.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>{item.kannada}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('days')}
            >
              <Text style={styles.categoryTitle}>Days of the Week</Text>
              <MaterialIcons 
                name={expandedCategory === 'days' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color="#000" 
              />
            </TouchableOpacity>
            {expandedCategory === 'days' && (
              <View style={styles.categoryContent}>
                {basics.days.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>{item.kannada}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory('months')}
            >
              <Text style={styles.categoryTitle}>Months</Text>
              <MaterialIcons 
                name={expandedCategory === 'months' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={24} 
                color="#000" 
              />
            </TouchableOpacity>
            {expandedCategory === 'months' && (
              <View style={styles.categoryContent}>
                {basics.months.map((item, index) => (
                  <View key={index} style={styles.basicItem}>
                    <Text style={styles.englishText}>{item.english}</Text>
                    <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
                    <Text style={styles.kannadaText}>{item.kannada}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
        
      case 'numbers':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Numbers</Text>
            {Object.entries(numbers).map(([range, numberList]) => (
              <View key={range} style={styles.numberRangeContainer}>
                <Text style={styles.rangeTitle}>{range}</Text>
                <View style={styles.numbersGrid}>
                  {numberList.map((number, index) => (
                    <View key={`${range}-${index}`} style={styles.numberCard}>
                      <View style={styles.numberContent}>
                        <Text style={styles.numberEnglish}>{number.english}</Text>
                        <Text style={styles.kannadaText}>{number.kannada}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'lessons' && styles.activeTab]}
          onPress={() => setActiveTab('lessons')}
        >
          <MaterialIcons 
            name="menu-book" 
            size={20} 
            color={activeTab === 'lessons' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'lessons' && styles.activeTabText]}>
            Lessons
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'basics' && styles.activeTab]}
          onPress={() => setActiveTab('basics')}
        >
          <MaterialIcons 
            name="assignment" 
            size={20} 
            color={activeTab === 'basics' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'basics' && styles.activeTabText]}>
            Basics
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'numbers' && styles.activeTab]}
          onPress={() => setActiveTab('numbers')}
        >
          <MaterialIcons 
            name="filter-1" 
            size={20} 
            color={activeTab === 'numbers' ? '#FF3333' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'numbers' && styles.activeTabText]}>
            Numbers
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <View style={styles.contentContainer}>
          {activeTab === 'lessons' && <SpeakingPerson />}
          {activeTab === 'lessons' && <StartLearningButton />}
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  startLearningButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  startLearningText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  startLearningButton: {
    backgroundColor: '#FF3333',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 10,
  },
  waveBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  headerContent: {
    position: 'relative',
    zIndex: 2,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 10,
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
  speakingContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  characterSpeechContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'relative',
    width: '100%',
    minHeight: 120, // Ensure minimum height for the container
  },
  speechText: {
    color: COLORS.red,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
  },
  character: {
    width: 80,
    height: 120,
    position: 'relative',
    alignItems: 'center',
    marginLeft: 10,
    animationName: 'float',
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  characterHead: {
    width: 60,
    height: 60,
    backgroundColor: '#FFD5B0',
    borderRadius: 30,
    position: 'relative',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#E5BFA0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  characterEyes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  characterEye: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.black,
    borderRadius: 5,
    marginTop: 5,
  },
  characterSmile: {
    width: 25,
    height: 12,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: COLORS.black,
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
  },
  characterMouth: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF6B6B',
    marginTop: 3,
  },
  characterBody: {
    marginTop: -5,
    alignItems: 'center',
  },
  characterShirt: {
    width: 70,
    height: 80,
    backgroundColor: COLORS.red,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'relative',
    zIndex: 5,
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 10,
    maxWidth: '60%',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  speechTail: {
    position: 'absolute',
    right: -10,
    top: '50%',
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.white,
    transform: [{ translateY: -10 }],
  },
  speechText: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'KannadaSangamMN-Bold',
    lineHeight: 18,
  },
  languageContainer: {
    position: 'absolute',
    bottom: -30,
    width: '100%',
    alignItems: 'center',
  },
  kannadaPhrase: {
    fontSize: 13,
    fontFamily: 'KannadaSangamMN-Bold',
    color: COLORS.red,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
