import React, { useContext, navigation } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import storyModeLogo from '../../images/StoryModeLogo.png';
import forestBackground from '../../images/forest_pfp.jpg';
import Duck from '../../modules/CharDuck';
import swipeLeft from '../../images/cancel.png';
import swipeRight from '../../images/green-heart-button.png';
import briefCase from '../../images/briefcase.png';
import iButton from '../../images/i-button.png';
import BackArrow from '../../modules/BackArrow'
import verify from '../../images/verify.png'

const window = Dimensions.get('window');
const TinderSwipePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style= {styles.headerContainer}>
      <View style={styles.backContainer}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()} // Use navigation.goBack() to go back
      >
        <BackArrow/>
      </TouchableOpacity>
        </View>
        <Image source={storyModeLogo} style={styles.imageLogo} />
      </View>
      <View style={styles.profileContainer}>
          <Image source={forestBackground} style={styles.pfpBackground} />
          
          <View style={styles.duckContainer}>
            <Duck />
          </View>

          <View style={styles.buttonContainer}>
            <Image source={swipeLeft} style={styles.swipeLeftButton} />
            <Image source={swipeRight} style={styles.swipeRightButton} />
        </View>
      </View>

      <View style= {styles.textContainer}>
        <View style= {styles.nameContainer}>
          <Text style={styles.animalName}>Quaxly, 25</Text>
          <Image source={verify} style={styles.verifyIcon} />
          <Image source={iButton} style={styles.informationButton} />
        </View>

        <View style={styles.occupationContainer}>
          <Image source={briefCase} style={styles.briefCase} />
          <Text style={styles.occText}>Professional Sleeper</Text>
        </View>

        <Text style={styles.bioText}>are you a 2 cuz that's a 10 in binary</Text>
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
    fontSize: 34,
    marginBottom: 5
  },
  swipeLeftButton: {
    width: 80,
    height: 80,
  },
  occText: {
    fontSize: 20
  },
  bioText: {
    fontSize: 22
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: window.width * 0.1,
  },
  textContainer: {
    width: window.width,
    padding: 15,
  },
  backContainer: {
    
  },
  informationButton: {
    width: 30,
    height: 30,
    marginLeft: window.width * 0.32
  },
  swipeRightButton: {
    width: 80,
    height: 80,
    marginLeft: 190
  },
  verifyIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    marginLeft: 8
  },
  buttonContainer: {
    flexDirection: 'row', // Set items horizontally
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure Buttons are on top
    position: 'absolute',
    top: 470,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileContainer: {
    position: 'relative',
  },
  occupationContainer: {
    flexDirection: 'row', // Set items horizontally
    alignItems: 'center',
  },
  duckContainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure Duck is on top
  },
  nameContainer: {
    flexDirection: 'row', // Set items horizontally
    alignItems: 'center',
  },
  image: {
    width: 200, // adjust the width as needed
    height: 200, // adjust the height as needed
  },
  imageLogo: {
    width: 220,
    height: 60
  },
  briefCase: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  pfpBackground:
  {
    height: window.height * 0.7,
    width: 380,
    borderRadius: 10,
  }
});

export default TinderSwipePage;