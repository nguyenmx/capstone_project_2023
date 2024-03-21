import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import rectangle from '../../images/ProfilePage/rectangle.png';
import pp from '../../images/ProfilePage/pink_stripes.gif';

import profileIcon from '../../images/ProfilePage/girl.png';
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
import award1 from '../../images/ProfilePage/Achievements/label.png'
import award2 from '../../images/ProfilePage/Achievements/food_complete.png'
import award3 from '../../images/ProfilePage/Achievements/paw.png'
import award4 from '../../images/ProfilePage/Achievements/ribbon.png'
import BackArrow from '../../modules/BackArrow';

const window = Dimensions.get('window');
const backgroundImage = pp;

const ProfilePage = ({ navigation }) => {
  const { name, setName, playerHealth} = useContext(ReferenceDataContext);
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <Text style={styles.TitleText}>Player Profile</Text>

        <View style={styles.profileContainer}>

          <TouchableOpacity>
            <Image source={settingsButton} style={styles.settings} />
          </TouchableOpacity>
          <Image source={profileIcon} style={styles.profileIcon} />
          
          <Text style={styles.nameText}>{name}</Text>
          
      
          {/* <Image source={profileImagePath} style={styles.profileIcon} /> */}

          <View style={styles.imagesContainer}>
            {/* Map through profileImages and render each image */}
            {Object.values(profileImages).map((image, index) => (
              <Image key={index} source={image} style={styles.petImage} />
            ))}
          </View>

          {/* <Duck duckType={selectedDuck} Optional={{top:200, zIndex: 999, position: 'absolute'}}/> */}

          {/* Updated rectangle style */}
          <View style={styles.rectangle}>
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />
            <Image source={profileImagePath} style={{width: 55, height: 55, top: 60, left: 59, position:'absolute'}} />
          </View>
          {/* Header Section */}
          <View style={{ backgroundColor: 'orange', padding: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Text style={{ fontSize: 20, fontFamily: 'NiceTango-K7XYo', color: 'rgba(254, 252, 229, 1)', textAlign: 'center', letterSpacing: 2 }}>{name}</Text>
            </View>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributeNames}>Pets</Text>
            <Text style={styles.attributeNames}> </Text>
            <Text style={styles.attributeNames}>Wins|Loses</Text>
            <Text style={styles.attributeNames}>Favorite pet</Text>
            <Text style={styles.attributeNames}>Achievements</Text>

          <View style={styles.awardsContainer}>
            <Image source={award1} style={styles.awardImage} />
            <Image source={award2} style={styles.awardImage} />
            <Image source={award3} style={styles.awardImage} />
            <Image source={award4} style={styles.awardImage} />
          </View>
          </View>
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
    top: window.height * .04
  },

  rectangle: {
    width: '85%',
    height: '95%', 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 140,
  
  },
  topHalf: {
    flex: .2,
    borderTopLeftRadius:59,
    borderTopRightRadius:59,
    backgroundColor: '#FABABA',
    width: '101%',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    width: '101%',
    borderWidth: 5, 
    borderColor: '#FABABA',
    borderBottomLeftRadius:59,
    borderBottomRightRadius:59,
  },
  backButton:{
    top:34,
    left: -159
  },
  settings: {
    width: 70,
    height: 70,
    left: 140,
    top: 30,
  },
  profileIcon: {
    width: 120,
    height: 120,
    zIndex: 2,
    marginBottom: 10,
  },
  attributesContainer: {
    zIndex: 2,
    alignItems: 'left',
    right: 55,
  },
  attributeNames: {
    zIndex: 2,
    fontSize: 28,
    marginTop: 35,
    color: 'rgba(137, 40, 125, 0.70)',
    fontFamily: 'NiceTango-K7XYo',
  },
  nameContainer: {
    width: 175,
    height: 60,
    borderWidth: 4,
    borderColor: 'rgba(160, 200, 220, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(184, 240, 260, 1)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(117, 82, 103, 0.8)',
    shadowOpacity: 1,
    zIndex:998,
    marginTop: 10,
    position: 'absolute'
  },
  nameText: {
    fontFamily: 'Gunkid-0W9yv',
    fontSize: 55,
    color: 'black',
    zIndex: 999,
    marginTop: window.height * .25,
    position: 'absolute'
  },
 TitleText: {
    fontFamily: 'Gunkid-0W9yv',
    fontSize: 38,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    marginTop: window.height * .05,
    position: 'absolute'
  },
  awardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 360,
    position: 'absolute'
  },
  awardImage: {
    width: 60, 
    height: 60, 
    marginHorizontal: 5, 
    tintColor: 'black'
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 256,
    left: 34,
    zIndex: 999,
    width: '55%', // Ensure the container spans the entire width]
    position: 'absolute'
  },
  petImage: {
    width: '23%', // Adjusted width to fit 4 images in a row with some spacing
    aspectRatio: 1, // Maintain aspect ratio to prevent distortion
    margin: '1%', // Add some margin around each image
  },
});
