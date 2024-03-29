import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import rectangle from '../../images/ProfilePage/rectangle.png';
import profileIcon from '../../images/ProfilePage/profileIcon.png';
import settingsButton from '../../images/settingButton.png';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import Duck from '../../modules/CharDuck';
import FriendshipLevel from '../../components/main_game_logic/FriendshipLevel';
import birdprof from '../../images/PetHouse/Asset12.png'
import p2 from '../../images/PetHouse/Asset4.png'
import p3 from '../../images/PetHouse/Asset7.png'
import p4 from '../../images/PetHouse/Asset8.png'
import p5 from '../../images/PetHouse/Asset11.png'
import p6 from '../../images/PetHouse/Asset13.png'
import p1 from '../../images/PetHouse/Asset2.png'


const window = Dimensions.get('window');
const backgroundImage = require('../../images/ProfilePage/pawsBackground.png');

const ProfilePage = ({ navigation }) => {
  const { selectedDuck } = useContext(ReferenceDataContext);
  
  const profileImages = {
    0: p3,//wave
    1: p1,//Capy
    2: p6, //Rizz
    3: p5, //Coffe
    4: p2, // Banana
    5: birdprof, //crow
    6: p4, //Squid
  };

  const profileImagePath = profileImages[selectedDuck];

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.profileContainer}>
        <TouchableOpacity>
           <Image source={settingsButton} style={styles.settings} />
          </TouchableOpacity>
          {/* <Image source={profileIcon} style={styles.profileIcon} /> */}
          <Image source={profileImagePath} style={styles.profileIcon} />

          <View style={styles.attributesContainer}>
            <Text style={styles.attributeNames}>Name</Text>
            <Text style={styles.attributeNames}>Gender</Text>
            <Text style={styles.attributeNames}>Age</Text>
            <Text style={styles.attributeNames}>Birthday</Text>
            <Text style={styles.attributeNames}>Weight</Text>
            <Text style={styles.attributeNames}>Nature</Text>
              <Text style={styles.attributeNames}>Species</Text>
          </View>
          {/* <Duck duckType={selectedDuck} Optional={{top:200, zIndex: 999, position: 'absolute'}}/> */}

          <FriendshipLevel style= {{zIndex:999}} ></FriendshipLevel>
          <Image source={rectangle} style={styles.rectangle} />
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
    bottom: window.height * 0.65,
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
  },
  attributesContainer: {
    zIndex: 2,
    alignItems: 'left',
    right: 82,
  },
  duckPosition: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  attributeNames: {
    zIndex: 2,
    fontSize: 28,
    marginTop: 35,
    color: 'rgba(137, 40, 125, 0.70)',
    fontFamily: 'NiceTango-K7XYo',
  },
});
