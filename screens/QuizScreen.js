import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const QuizScreen = ({ route }) => {
  const { lesson } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizType, setQuizType] = useState('kannadaToEnglish'); // or 'englishToKannada'

  useEffect(() => {
    generateQuestions();
  }, [lesson]);

  const generateQuestions = () => {
    try {
      const generatedQuestions = [];
      
      // Generate questions from vocabulary
      if (lesson.vocabulary) {
        const vocab = Array.isArray(lesson.vocabulary) 
          ? lesson.vocabulary 
          : Object.entries(lesson.vocabulary).map(([kannada, english]) => ({ kannada, english }));
        
        vocab.forEach((item, index) => {
          if (index < 5) { // Limit to 5 vocabulary questions per type
            generatedQuestions.push({
              type: 'vocabulary',
              question: quizType === 'kannadaToEnglish' ? item.kannada : item.english,
              answer: quizType === 'kannadaToEnglish' ? item.english : item.kannada,
              options: generateOptions(vocab, item, quizType === 'kannadaToEnglish' ? 'english' : 'kannada')
            });
          }
        });
      }

      // Generate questions from conversations
      if (lesson.conversations) {
        let convIndex = 0;
        lesson.conversations.forEach(conv => {
          const lines = conv.lines || conv.turns || [];
          lines.forEach((line, i) => {
            if (typeof line === 'object' && line.kannada && line.english) {
              if (convIndex < 5) { // Limit to 5 conversation questions
                generatedQuestions.push({
                  type: 'conversation',
                  question: `Translate: ${quizType === 'kannadaToEnglish' ? line.kannada : line.english}`,
                  answer: quizType === 'kannadaToEnglish' ? line.english : line.kannada,
                  context: lines.slice(Math.max(0, i-1), i+2).map(l => ({
                    kannada: l.kannada || (typeof l === 'object' ? l[Object.keys(l)[0]] : ''),
                    english: l.english || ''
                  }))
                });
                convIndex++;
              }
            }
          });
        });
      }

      // Shuffle questions
      const shuffledQuestions = generatedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateOptions = (vocab, correctItem, key) => {
    const options = [correctItem[key]];
    const otherItems = vocab.filter(item => item !== correctItem);
    
    while (options.length < 4 && otherItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherItems.length);
      const option = otherItems.splice(randomIndex, 1)[0][key];
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        // Quiz completed
        Alert.alert(
          'Quiz Completed!',
          `Your score: ${score + (isCorrect ? 1 : 0)}/${questions.length}`,
          [
            { text: 'Try Again', onPress: resetQuiz },
            { 
              text: 'Switch Mode', 
              onPress: () => {
                setQuizType(prev => prev === 'kannadaToEnglish' ? 'englishToKannada' : 'kannadaToEnglish');
                resetQuiz();
              } 
            }
          ]
        );
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    generateQuestions();
  };

  if (loading || questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3333" />
        <Text style={styles.loadingText}>Preparing your quiz...</Text>
      </View>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.quizContainer}>
        <Text style={styles.quizMode}>
          {quizType === 'kannadaToEnglish' ? 'Kannada to English' : 'English to Kannada'}
        </Text>
        
        {currentQ.context && (
          <View style={styles.contextContainer}>
            <Text style={styles.contextTitle}>Context:</Text>
            {currentQ.context.map((line, i) => (
              <View key={i} style={styles.contextLine}>
                <Text style={styles.kannadaText}>{line.kannada}</Text>
                <Text style={styles.englishText}>{line.english}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQ.type === 'vocabulary' 
              ? `What is the ${quizType === 'kannadaToEnglish' ? 'English' : 'Kannada'} for:`
              : ''}
          </Text>
          <Text style={styles.question}>
            {currentQ.question}
          </Text>
        </View>

        {currentQ.options ? (
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  showResult && option === currentQ.answer && styles.correctOption,
                  showResult && option !== currentQ.answer && styles.incorrectOption,
                ]}
                onPress={() => !showResult && handleAnswer(option)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{option}</Text>
                {showResult && option === currentQ.answer && (
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.resultIcon} />
                )}
                {showResult && option !== currentQ.answer && (
                  <MaterialIcons name="cancel" size={20} color="#F44336" style={styles.resultIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder={`Type the ${quizType === 'kannadaToEnglish' ? 'English' : 'Kannada'} translation`}
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => handleAnswer(userAnswer.trim())}
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => handleAnswer(userAnswer.trim())}
              disabled={!userAnswer.trim()}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {userAnswer === currentQ.answer ? 'Correct! 🎉' : `Incorrect. The answer is: ${currentQ.answer}`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progress: {
    fontSize: 16,
    color: '#666',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3333',
  },
  quizContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizMode: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  contextContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  contextTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  contextLine: {
    marginBottom: 6,
  },
  kannadaText: {
    fontSize: 15,
    fontFamily: 'KannadaSangamMN-Bold',
    color: '#333',
  },
  englishText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginLeft: 10,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'KannadaSangamMN-Bold',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  resultIcon: {
    marginLeft: 8,
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#FF3333',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1976D2',
  },
});

export default QuizScreen;
