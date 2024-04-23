import React, { useContext, useRef, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import { Audio } from 'expo-av';
import CharacterSelector from '../../modules/CharacterSelector';

const window = Dimensions.get('window');
const backgroundImage = require('../../images/Backgrounds/combatModeBackground.png');
const swordIcon = require('../../images/CombatScreen/swordIcon.png');

const CombatModeScreen = ({ navigation }) => {
  // Access the selectedDuck value from the context
  const { selectedDuck } = useContext(ReferenceDataContext);

  const [soundLoaded, setSoundLoaded] = useState(false);
  const soundObject = useRef(new Audio.Sound()).current;

  useEffect(() => {
    const handlePlay = async () => {
      if (soundLoaded) {
        try {
          await soundObject.replayAsync();
        } catch (error) {
          console.error('Error replaying the sound:', error);
        }
      } else {
        try {
          await soundObject.loadAsync(require('../../assets/sfx/combat_mode.wav'),{ shouldPlay: true, isLooping: true });
          await soundObject.playAsync();
          setSoundLoaded(true);
        } catch (error) {
          console.error('Error loading or playing the sound:', error);
        }
      }
    };

    handlePlay();

    return () => {
      if (soundLoaded) {
        soundObject.unloadAsync();
      }
    };
  }, [soundLoaded]);

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.titleText}>Combat Mode</Text>
        <View style={styles.swordContainer}>
          <Image source={swordIcon} style={styles.sword} />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('BattleScreen')}
        >
          <Text style={styles.buttonText}>Fight!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.combatPowerContainer}
          onPress={() => navigation.navigate('StepsConversion')}
        >
          <Text style={homeButtonStyles.buttonText}>Combat Power</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={homeButtonStyles.buttonContainer}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={homeButtonStyles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
        <CharacterSelector></CharacterSelector>
      </ImageBackground>
    </View>
  );
};

export default CombatModeScreen;

// Styling
const styles = StyleSheet.create({
  swordContainer: {
    width: window.width * 0.3, // Adjust the width to resize the image
    aspectRatio: 1,
    marginTop: window.height * 0.03,
    marginBottom: window.height * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sword: {
    width: '100%',
    height: '100%', 
  },
  buttonContainer: {
    width: window.width * 0.7,
    height: window.height * 0.1,
    backgroundColor: '#FF4242',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: window.height * 0.015,
  },
  combatPowerContainer: {
    width: window.width * 0.7,
    height: window.height * 0.1,
    backgroundColor: '#ff8503',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: window.height * 0.015,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontSize: window.width * 0.1,
    color: 'white',
  },
  duck: {
    marginTop: window.height * 0.02,
    width: window.width * 0.5,
    height: window.height * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: window.width * 0.11,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: window.height * 0.06,
  },
});


const homeButtonStyles = {
  buttonContainer: {
    width: window.width * 0.7,
    height: window.height * 0.1,
    backgroundColor: '#8BE3FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: window.height * 0.02,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: window.width * 0.075,
    color: 'white',
  },
};