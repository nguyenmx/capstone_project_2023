import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import rectangle from '../../images/ProfilePage/rectangle.png';
import profileIcon from '../../images/ProfilePage/profileIcon.png';
import settingsButton from '../../images/settingButton.png';


const window = Dimensions.get('window');
const backgroundImage = require('../../images/ProfilePage/pawsBackground.png');

const ProfilePage = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style = {styles.profileContainer}>
            <Image source={settingsButton} style= {styles.settings}></Image>
            <Image source={profileIcon} style= {styles.profileIcon}></Image>   
        <View style = {styles.attributesContainer}>
            <Text style= {styles.attributeNames}>Name </Text>
            <Text style= {styles.attributeNames}>Gender</Text>
            <Text style= {styles.attributeNames}>Age</Text>
            <Text style= {styles.attributeNames}>Birthday</Text>
            <Text style= {styles.attributeNames}>Weight</Text>
            <Text style= {styles.attributeNames}>Nature</Text>
            <Text style= {styles.attributeNames}>Species</Text>
        </View>
        
            <Image source={rectangle} style= {styles.rectangle}></Image>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    alignItems: 'center',
  },
  rectangle: {
    bottom: window.height * 0.65
  },
  settings: {
    width: 80,
    height: 80,
    left: 140,
    top: 30,
  },
  profileIcon: {
    width: 130,
    height: 130,
    zIndex: 2,
    down: 20
  },
  attributesContainer: {
    zIndex: 2,
    alignItems: 'left',
    right: 82
  },
  attributeNames: {
    zIndex: 2,
    fontSize: 28,
    marginTop: 35,
    color: 'rgba(137, 40, 125, 0.70)',
    fontFamily: 'NiceTango-K7XYo',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 2,
  },

});
