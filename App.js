import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainGameScreen from './pages/main/MainGameScreen';
import MG from './pages/main/MG';
import StoryModeScreen from './pages/story/StoryModeScreen';
import CombatModeScreen from './pages/combat/CombatModeScreen';
import Animal from './components/Animal';
import { ReferenceDataContextProvider } from "./pages/ReferenceDataContext";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createStackNavigator();
const window = Dimensions.get('window');

const backgroundImage = require('./images/background.gif');

export default function App() {
  const [fontsLoaded] = useFonts({
    "NiceTango-K7XYo": require("./assets/fonts/NiceTango-K7XYo.ttf"),
    "StayPixelRegular-EaOxl": require("./assets/fonts/StayPixelRegular-EaOxl.ttf")
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded){
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ReferenceDataContextProvider>
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
        <Stack.Screen name="MG" component={MG} />
      </Stack.Navigator>
    </NavigationContainer>
    </ReferenceDataContextProvider>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.centeredContainer}>
          <Text style={styles.titleText}>Denwa Petto</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainGame')}>
              <Text style={styles.buttonText}>Main Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StoryMode')}>
              <Text style={styles.buttonText}>Story Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CombatMode')}>
              <Text style={styles.buttonText}>Combat Mode</Text>
            </TouchableOpacity>
            <Animal style={styles.duck} />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: window.width * 0.12,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: window.height * 0.08, // move title text up
  },
  buttonContainer: {
    marginTop: window.height * 0.02,
    alignItems: 'center', // center the buttons horizontally
  },
  button: {
    width: window.width * 0.55,
    height: window.height * 0.08,
    backgroundColor: '#F4A460',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: window.height * 0.05, // increase spacing between buttons
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: window.width * 0.06,
    color: 'white',
  },
});