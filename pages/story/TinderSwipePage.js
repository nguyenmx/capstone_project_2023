import React, { useContext, navigation, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import storyModeLogo from '../../images/StoryModeLogo.png';
import forestBackground from '../../images/forest_pfp.jpg'; //not used but a good example of image import
import Duck from '../../modules/CharDuck';
import swipeLeft from '../../images/cancel.png';
import swipeRight from '../../images/green-heart-button.png';
import briefCase from '../../images/briefcase.png';
import iButton from '../../images/i-button.png';
import BackArrow from '../../modules/BackArrow'
import verify from '../../images/verify.png'

const window = Dimensions.get('window');

const profiles = [
  { id: 1, name: 'Quaxly', age: 25, occupation: 'Professional Sleeper', bio: 'Are you a 2 cuz that\'s a 10 in binary', image: require('../../images/forest_pfp.jpg'), verified: true },
  { id: 2, name: 'Waddles', age: 21, occupation: 'Pond Ambassador', bio: 'Seeking someone for pond soirées', image: require('../../images/duckPond.png'), verified: true },
  // Add more profiles as needed...
];

const TinderSwipePage = ({ navigation }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

   // Dummy function for handling right swipe (like) for now
  const handleSwipeRight = () => {
    // Do nothing for now
  };

  const renderCurrentProfile = () => {
    const currentProfile = profiles[currentProfileIndex];
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => navigation.goBack()} // Use navigation.goBack() to go back
            >
              <BackArrow />
            </TouchableOpacity>
          </View>
          <Image source={storyModeLogo} style={styles.imageLogo} />
        </View>
        <View style={styles.profileContainer}>
          <Image source={currentProfile.image} style={styles.pfpBackground} />
  
          <View style={styles.duckContainer}>
            <Duck />
          </View>
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSwipeLeft}>
              <Image source={swipeLeft} style={styles.swipeLeftButton} />
            </TouchableOpacity>
            {/* Right swipe button (like) */}
            <TouchableOpacity onPress={handleSwipeRight}>
              <Image source={swipeRight} style={styles.swipeRightButton} />
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.nameInfoContainer}>
              <Text style={styles.animalName}>{`${currentProfile.name}, ${currentProfile.age}`}</Text>
              {currentProfile.verified && <Image source={verify} style={styles.verifyIcon} />}
            </View>
            <TouchableOpacity style={styles.informationButtonContainer}>
              <Image source={iButton} style={styles.informationButton} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.occupationContainer}>
            <Image source={briefCase} style={styles.briefCase} />
            <Text style={styles.occText}>{currentProfile.occupation}</Text>
          </View>
  
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              {currentProfile.bio}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  

  return renderCurrentProfile();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalName: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5
  },
  swipeLeftButton: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  occText: {
    fontSize: 20
  },
  bioText: {
    fontSize: 20,
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
  informationButton: {
    width: 30,
    height: 30,
    marginLeft: window.width * 0.35
  },
  swipeRightButton: {
    width: 80,
    height: 80,
    marginLeft: 190,
    marginBottom: 15,
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
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add spacing between name and other details if needed
  },
  nameInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationButtonContainer: {
    position: 'absolute',
    right: 10, // Adjust as needed
  },
  informationButton: {
    width: 30,
    height: 30,
  },
});

export default TinderSwipePage;