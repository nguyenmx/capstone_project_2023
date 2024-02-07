import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NameScreen from './pages/main/NameScreen';
import HowToPlay from './pages/main/HowToPlay';
import StoryModeScreen from './pages/story/StoryModeScreen';
import CombatModeScreen from './pages/combat/CombatModeScreen';
import StepTracker from './pages/steps/StepTracker';
import TestChatGPT from "./pages/story/TestChatGPT";
import { ReferenceDataContextProvider } from "./components/ReferenceDataContext";
import { useEffect, useContext, useState } from 'react';
import { useFonts } from 'expo-font';
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';
import LeftArrow from './images/LeftArrow.png';
import RightArrow from './images/RightArrow.png';
import * as SplashScreen from 'expo-splash-screen';
import TestingScreen from './pages/combat/TestingScreen';
import WinScreen from './pages/combat/WinScreen';
import LossScreen from './pages/combat/LossScreen';
import BattleScreen from './pages/combat/BattleScreen';
import PetHouse from './pages/main/PetHouse';
import Title from './images/Logos/Denwa_Petto.png'
import { ReferenceDataContext } from './components/ReferenceDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Duck from './modules/CharDuck';
import SpriteAnimation from './modules/SpriteAnimation';
import TinderPage from './pages/story/TinderSwipePage';
import Shop from './pages/main/Shop';
import ItemShop from './pages/main/ItemShop';
import Currency from './pages/main/Currency';
import ProfilePage from './pages/main/ProfilePage';
import { CurrencyProvider } from './pages/main/CurrencyContext';
import Inventory from './pages/main/Inventory';
import InventoryState from './pages/main/InventoryState';
import { Audio } from 'expo-av';

//import {AppleHealthKit} from 'react-native-health';

const Stack = createStackNavigator();
const window = Dimensions.get('window');
const backgroundImage = require('./images/Backgrounds/background.gif');
var selectedDuck = 0;


export default function App() {
  const [fontsLoaded] = useFonts({
    "NiceTango-K7XYo": require("./assets/fonts/NiceTango-K7XYo.ttf"),
    "StayPixelRegular-EaOxl": require("./assets/fonts/StayPixelRegular-EaOxl.ttf")
  })

  useEffect(() => {
    async function getSelectedDuck() {
      try {
        const value = await AsyncStorage.getItem('selectedDuck');
        if (value !== null) {
          // Convert the retrieved value to a number
          saveSelectedDuck(parseInt(value, 10));
        }
      } catch (error) {
        console.error('Error getting selectedDuck from AsyncStorage:', error);
      }
    }
  
    getSelectedDuck();

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
    <CurrencyProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTransparent: true, title: '' }}/>
        <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StoryMode" component={StoryModeScreen} />
        <Stack.Screen name="CombatMode" component={CombatModeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StepTracker" component={StepTracker} options={{ headerShown: false }}/>
        <Stack.Screen name="Inventory" component={Inventory}/>
        <Stack.Screen name="InventoryState" component={InventoryState}/>
        <Stack.Screen name="HowToPlay" component={HowToPlay} options={{ headerShown: false}}/>
        <Stack.Screen name="TestingScreen" component={TestingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WinScreen" component={WinScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LossScreen" component={LossScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StoryModeScreen" component={StoryModeScreen} />
        <Stack.Screen name="TestChatGPT" component={TestChatGPT} />
        <Stack.Screen name="BattleScreen" component={BattleScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="PetHouse" component={PetHouse} options={{ headerShown: false}}/>
        <Stack.Screen name="SpriteAnimation" component={SpriteAnimation} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="Currency" component={Currency} options={{ headerShown: false}}/>
        <Stack.Screen name="TinderSwipePage" component={TinderPage} options={{ headerShown: false}} />
        <Stack.Screen name="ItemShop" component={ItemShop} options={{ headerShown: false}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </CurrencyProvider>
    </ReferenceDataContextProvider>
  );
}

export function HomeScreen({ navigation }) {
  const { setSelectedDuck } = useContext(ReferenceDataContext);
  const [isAnimated, setIsAnimated] = useState(false);

  function saveSelectedDuck(index) {
    setSelectedDuck(index);
  }

  const duckImages = [
    require('./images/PlayableAnimals/duckWave.gif'),
    require('./images/PlayableAnimals/capyKnife.gif'),
    require('./images/PlayableAnimals/duckRizz.gif'),
    require('./images/PlayableAnimals/duckCoffee.gif'),
    require('./images/PlayableAnimals/ducky.gif'),
    SpriteAnimation,
    SpriteAnimation
  ];


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.centeredContainer}>
          <Image source={Title} style={styles.titleText} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NameScreen')}>
              <Text style={styles.buttonText}>Main Game</Text>
              <Image source={require('./images/OrangeBttn2.png')} style={styles.buttonImage} />

            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TinderSwipePage')}>
              <Text style={styles.buttonText}>Story Mode</Text>
              <Image source={require('./images/OrangeBttn2.png')} style={styles.buttonImage} />

            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CombatMode')}>
              <Text style={styles.buttonText}>Combat Mode</Text>
              <Image source={require('./images/OrangeBttn2.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StepTracker')}>
              <Text style={styles.buttonText}>Steps</Text>
              <Image source={require('./images/OrangeBttn2.png')} style={styles.buttonImage} />

            </TouchableOpacity>
          </View>
          <Swiper
            style={styles.swiperContainer}
            showsButtons={true}
            prevButton={<Image source={LeftArrow} style={styles.arrowButton} />}
            nextButton={<Image source={RightArrow} style={styles.arrowButton} />}
            onIndexChanged={(index) => saveSelectedDuck(index)}
          >
            {duckImages.map((duckImage, index) => (
              <View style={styles.swiperSlide} key={index}>
                {isAnimated ? (
                  index === selectedDuck ? (
                    <Duck duckType={index} image={duckImage} />
                  ) : (
                    <SpriteAnimation duckType={index} image={duckImage} />
                  )
                ) : (
                  <Duck duckType={index} image={duckImage} />
                )}
              </View>
            ))}
          </Swiper>
        </View>
      </ImageBackground>
    </View>
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
    marginTop: window.height * 0.04,
    width: 275,
    height: 130,
    position: 'relative',
  },
  buttonContainer: {
    marginTop: window.height * 0.025,
    alignItems: 'center',
  },
  button: {
    width: window.width * 0.54,
    height: window.height * 0.078,
    backgroundColor: '#F4A460',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: window.height * 0.045, // increase spacing between buttons
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: window.width * 0.065,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: 'white',
    zIndex: 997
  },
  swiperSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  gif: {
    width: window.width,
    height: window.height,
  },
  arrowButton: {
    width: window.width * 0.05,
    height: window.height * 0.05,
    aspectRatio: 1,
  },
  buttonImage: {
    position: 'absolute',
    transform: [{ scale: .2 }],
  },
});