import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
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
import Settings from '../../modules/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playSound } from '../../pages/main/PetHouse';

const window = Dimensions.get('window');
const backgroundImage = pp;

const ProfilePage = ({ navigation }) => {
  const { name, setName, playerHealth } = useContext(ReferenceDataContext);
  const { selectedDuck } = useContext(ReferenceDataContext);
  const [winCount, setWinCount] = useState(0);

  const profileImages = {
    0: p3, //wave
    1: p1, //Capy
    2: p6, //Rizz
    3: p5, //Coffe
    4: p2, // Banana
    5: birdprof, //crow
    6: p4, //Squid
  };

  const profileImagePath = profileImages[selectedDuck];

  const navigateToScreen1 = () => {
    navigation.navigate('PetHouse');
  };

  const navigateToScreen2 = () => {
    navigation.navigate('PetProfile');
  };

    // Retrieve the win count from AsyncStorage when the component mounts
    useEffect(() => {
      const getWinCount = async () => {
        try {
          const storedWinCount = await AsyncStorage.getItem('winCount');
          setWinCount(parseInt(storedWinCount) || 0);
        } catch (error) {
          console.error('Error retrieving win count:', error);
        }
      };
  
      getWinCount();
    }, []);

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

          <Settings playSound={playSound} />


          <View style={styles.profileIconContainer}>

          <TouchableOpacity>
            <Image source={profileIcon} style={styles.profileIcon} />
            </TouchableOpacity>

            <Text style={styles.profileIconText}>☀️ {name} ☀️</Text>
          </View>

          <View style={styles.imagesContainer}>
            {/* Map through profileImages and render each image */}
            {Object.values(profileImages).map((image, index) => (
              <Image key={index} source={image} style={styles.petImage} />
            ))}
          </View>

          <View style={styles.rectangle}>
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />
            <Image source={profileImagePath} style={{ width: 55, height: 55, bottom: 170, right: 70, position: 'absolute' }} />
          </View>

          <Text style={{color: 'black', fontFamily: 'NiceTango-K7XYo', position: 'absolute', top: 415, right: 15, fontSize: 30  }}>{winCount}</Text>

          <View style={styles.attributesContainer}>
            <Text style={styles.attributeNames}>Pets</Text>
            <Text style={styles.attributeNames}> </Text>
            <Text style={styles.attributeNames}>Wins</Text>
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

        {/* Buttons at the bottom for navigation */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.bottomButton} onPress={navigateToScreen1}>
            <Text style={styles.bottomButtonText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={navigateToScreen2}>
            <Text style={styles.bottomButtonText}>Pets</Text>
          </TouchableOpacity>
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
    top: window.height * -.02
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
    flex: .22,
    borderTopLeftRadius: 59,
    borderTopRightRadius: 59,
    backgroundColor: '#FABABA',
    width: '101%',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    width: '101%',
    borderWidth: 5,
    borderColor: '#FABABA',
    borderBottomLeftRadius: 59,
    borderBottomRightRadius: 59,
  },
  backButton: {
    top: 34,
    left: -159
  },
  settings: {
    width: 70,
    height: 70,
    left: 145,
  },
  profileIconContainer: {
    alignItems: 'center',
    zIndex: 999
  },
  profileIcon: {
    width: 120,
    height: 120,
    zIndex: 1000,
  },
  profileIconText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 45,
    color: 'white',
    zIndex: 999,
  },
  attributesContainer: {
    zIndex: 2,
    alignItems: 'left',
    right: 55,
    right: 55,
  },
  attributeNames: {
    zIndex: 2,
    fontSize: 28,
    marginTop: 35,
    color: 'rgba(137, 40, 125, 0.70)',
    fontFamily: 'NiceTango-K7XYo',
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
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 256,
    left: 34,
    zIndex: 999,
    width: '55%',
    position: 'absolute'
  },
  petImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  petImage: {
    width: '23%',
    aspectRatio: 1,
    margin: '1%',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
  },
  bottomButton: {
    backgroundColor: 'rgba(137, 40, 125, 0.70)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
