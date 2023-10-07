import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainGameScreen from './pages/MainGameScreen';
import StoryModeScreen from './pages/StoryModeScreen';
import CombatModeScreen from './pages/CombatModeScreen';
import Animal from './components/Animal';

const Stack = createStackNavigator();

// Import your cropped GIF as a local image
const backgroundImage = require('./images/background.gif');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTransparent: true, title: '' }}
        />
        <Stack.Screen name="MainGame" component={MainGameScreen} />
        <Stack.Screen name="StoryMode" component={StoryModeScreen} />
        <Stack.Screen name="CombatMode" component={CombatModeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.titleText}>Denwa Petto</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainGame')}>
            <Text style={[styles.buttonText, styles.buttonTextWithShadow]}>Main Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StoryMode')}>
            <Text style={[styles.buttonText, styles.buttonTextWithShadow]}>Story Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CombatMode')}>
            <Text style={[styles.buttonText, styles.buttonTextWithShadow]}>Combat Mode</Text>
          </TouchableOpacity>
          <Animal style={styles.duck}></Animal>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  button: {
    width: 220,
    height: 80,
    backgroundColor: '#F4A460',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonTextWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
