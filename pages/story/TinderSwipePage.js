import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import storyModeLogo from '../../images/StoryModeLogo.png';
import forestBackground from '../../images/forest_pfp.jpg';
import duck from '../../modules/CharDuck';
import swipeLeft from '../../images/cancel.png';
import swipeRight from '../../images/green-heart-button.png';
import briefCase from '../../images/briefcase.png';
import iButton from '../../images/i-button.png';

const TinderSwipePage = () => {
  return (
    <View style={styles.container}>
      <Image source={storyModeLogo} style={styles.imageLogo} />
      <Image source={forestBackground} style={styles.pfpBackground} />
      <View style= {styles.textContainer}>
        <Text style={styles.animalName}>Quaxly, 25</Text>
        <Image source={briefCase} style={styles.briefCase} />
        <Text>Professional Sleeper</Text>
        <Text>are you a 2 cuz that's a 10 in binary</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Image source={swipeLeft} style={styles.swipeLeftButton} />
        <Image source={swipeRight} style={styles.swipeRightButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalName: {
    fontWeight: 'bold',
    fontSize: 30
  },
  swipeLeftButton: {
    width: 80,
    height: 80,
  },
  swipeRightButton: {
    width: 80,
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row', // Set items horizontally
    alignItems: 'center',
  },
  image: {
    width: 200, // adjust the width as needed
    height: 200, // adjust the height as needed
  },
  imageLogo: {
    width: 60,
    height: 60
  },
  briefCase: {
    width: 25,
    height: 25
  },
  pfpBackground:
  {

    height: 550,
    width: 380,
    borderRadius: 10
  }
});

export default TinderSwipePage;