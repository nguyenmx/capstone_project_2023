import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../ReferenceDataContext';

const window = Dimensions.get('window');
const backgroundImage = require('../../images/combatModeBackground.png');
const swordIcon = require('../../images/swordIcon.png');

const CombatModeScreen = ({ navigation }) => {
  // Access the selectedDuck value from the context
  const { selectedDuck } = useContext(ReferenceDataContext);

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.titleText}>Combat Mode</Text>
        <View style={styles.swordContainer}>
          <Image source={swordIcon} style={styles.sword} />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TestingScreen')}
        >
          <Text style={styles.buttonText}>Fight!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homeButtonStyles.buttonContainer}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={homeButtonStyles.buttonText}>Back To Home</Text>
        </TouchableOpacity>
        <Duck duckType={selectedDuck} />
      </ImageBackground>
    </View>
  );
};

export default CombatModeScreen;

// Styling
const styles = StyleSheet.create({
  swordContainer: {
    width: window.width * 0.4, // Adjust the width to resize the image
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