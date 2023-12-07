import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../ReferenceDataContext';

const window = Dimensions.get('window');
const backgroundImage = require('../../images/background.gif');
const victoryBanner = require('../../images/victoryBanner.png');

const WinScreen = ({ navigation }) => {
  const { selectedDuck } = useContext(ReferenceDataContext);

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.bannerContainer}>
          <Image source={victoryBanner} style={styles.banner} />
        </View>
        <Duck duckType={selectedDuck} />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('FightScreen')}
        >
          <Text style={styles.buttonText}>Back To Menu</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default WinScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: window.width * 0.7,
    height: window.height * 0.1,
    backgroundColor: '#32CD32',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: window.height * 0.1,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: window.width * 0.075,
    color: 'white',
  },
  bannerContainer: {
    width: window.width * 0.7,
    aspectRatio: 702 / 614, // Adjust the aspect ratio to fit the banner image
    marginTop: window.height * 0.04,
    marginBottom: window.height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%',
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

