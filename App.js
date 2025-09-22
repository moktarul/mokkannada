import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import LessonDetail from './screens/LessonDetail';
import QuizScreen from './screens/QuizScreen';
import LessonList from './components/LessonList';
import BasicsScreen from './screens/BasicsScreen';
import NumbersScreen from './screens/NumbersScreen';

const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  headerStyle: {
    backgroundColor: '#FF3333',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitle: 'Back',
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#FF3333" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Basics" 
            component={BasicsScreen}
            options={{
              title: 'Kannada Basics',
              ...commonScreenOptions,
            }}
          />
          <Stack.Screen 
            name="Numbers" 
            component={NumbersScreen}
            options={{
              title: 'Kannada Numbers',
              ...commonScreenOptions,
            }}
          />
          <Stack.Screen 
            name="LessonList" 
            component={LessonList}
            options={{
              title: 'Kannada Lessons',
              ...commonScreenOptions,
            }}
          />
          <Stack.Screen 
            name="LessonDetail" 
            component={LessonDetail}
            options={{
              ...commonScreenOptions,
              headerBackTitle: 'Lessons',
            }}
          />
          <Stack.Screen 
            name="Quiz" 
            component={QuizScreen}
            options={{
              title: 'Quiz',
              ...commonScreenOptions,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
