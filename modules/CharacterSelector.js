import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Swiper from 'react-native-swiper';
import Duck from './CharDuck';
import SpriteAnimation from './SpriteAnimation';
import { ReferenceDataContext } from '../components/ReferenceDataContext';
import { SplashScreen } from 'expo';

const window = Dimensions.get('window');
const LeftArrow = require('../images/LeftArrow.png');
const RightArrow = require('../images/RightArrow.png');

const CharacterSelector = ({ navigation }) => {
  const { setSelectedDuck } = useContext(ReferenceDataContext);
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedDuckState, setSelectedDuckState] = useState(0);

  useEffect(() => {
    async function getSelectedDuck() {
      try {
        const value = await AsyncStorage.getItem('selectedDuck');
        if (value !== null) {
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
  }, []);

  function saveSelectedDuck(index) {
    setSelectedDuck(index);
  }

  const duckImages = [
    require('../images/PlayableAnimals/duckWave.gif'),
    require('../images/PlayableAnimals/capyKnife.gif'),
    require('../images/PlayableAnimals/duckRizz.gif'),
    require('../images/PlayableAnimals/duckCoffee.gif'),
    require('../images/PlayableAnimals/ducky.gif'),
    SpriteAnimation,
    SpriteAnimation
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.centeredContainer}>
        <View style={styles.swiperContainer}>
          <Swiper
            showsButtons={true}
            prevButton={<Image source={LeftArrow} style={styles.arrowButton} />}
            nextButton={<Image source={RightArrow} style={styles.arrowButton} />}
            onIndexChanged={(index) => saveSelectedDuck(index)}
          >
            {duckImages.map((duckImage, index) => (
              <View style={styles.swiperSlide} key={index}>
                {isAnimated ? (
                  index === selectedDuckState ? (
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrowButton: {
    width: window.width * 0.05,
    height: window.height * 0.05,
    aspectRatio: 1,
  },
});

export default CharacterSelector;
