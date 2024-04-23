import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import pp from '../../images/ProfilePage/pink_stripes.gif';
import settingsButton from '../../images/settingButton.png';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import Duck from '../../modules/CharDuck';
import { duckData } from '../../modules/CharDuck'; // Adjust path as needed

import FriendshipLevel from '../../components/main_game_logic/FriendshipLevel';
import birdprof from '../../images/PetHouse/Asset12.png'
import p2 from '../../images/PetHouse/Asset4.png'
import p3 from '../../images/PetHouse/Asset7.png'
import p4 from '../../images/PetHouse/Asset8.png'
import p5 from '../../images/PetHouse/Asset11.png'
import p6 from '../../images/PetHouse/Asset13.png'
import p1 from '../../images/PetHouse/Asset2.png'
import BackArrow from '../../modules/BackArrow';
import Settings from '../../modules/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playSound } from '../../pages/main/PetHouse';

const window = Dimensions.get('window');
const backgroundImage = pp;

const PetProfile = ({ navigation }) => {
  const { selectedDuck } = useContext(ReferenceDataContext);

  console.log(duckData[selectedDuck]);

  const navigateToScreen1 = () => {
    navigation.navigate('PetHouse');
  };

  const navigateToScreen2 = () => {
    navigation.navigate('PetProfile');
  };

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>

        <View style={styles.profileContainer}>


  <Settings playSound={playSound}/>


  <Image source={ duckData[selectedDuck].imageSource } style={{position: 'absolute',zIndex: 999, width: 190, height: 190, top: 10}} />
  <View style={styles.rectangle}>
    <View style={styles.topHalf}> 
    <Text style={styles.profileIconText}>{duckData[selectedDuck].name}</Text>
    </View>

    <View style={styles.bottomHalf} >
    
    <View style={styles.bottomHalf}>
  <View style={styles.attributeRow}>
    <Text style={styles.attributeNames}>Species:</Text>
    <Text style={styles.attributeNames}>  {duckData[selectedDuck].species}</Text>
  </View>

  <View style={styles.attributeRow}>
    <Text style={styles.attributeNames}>Favorite Food:  </Text>
    <Image source= {duckData[selectedDuck].favorite_food} style={styles.itemImage} ></Image>
  </View>

  <View style={styles.attributeRow}>
    <Text style={styles.attributeNames}>Hated Food:  </Text>
    <Image source= {duckData[selectedDuck].hate} style={styles.itemImage} ></Image>
  </View>

  <View style={styles.attributeRow}>
    <Text style={styles.attributeNames}>Gender: </Text>
    <Text style={styles.attributeNames}>{/* Placeholder for gender */}</Text>
  </View>



  <FriendshipLevel id={selectedDuck} style={{ marginTop: 10 , left: 10}} />
</View>


  </View>

  </View>

</View>

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

export default PetProfile;


const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemImage: {
    width: 85,
    height: 85,
  },
  profileContainer: {
    alignItems: 'center',
    top: window.height * -.02
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 10,
  },  
  rectangle: {
    width: 345,
    height: 570,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 140,
  },
  topHalf: {
    flex: .22,
    borderTopLeftRadius: 59,
    borderTopRightRadius: 59,
    backgroundColor: 'rgba(255, 190, 162, 1)',
    width: '101.9%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    width: '100.7%',
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
    zIndex: 999,
    justifyContent: 'center'
  },
  profileIconText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 45,
    color: 'black',
    zIndex: 999,
    marginBottom:-50,
  },
  attributesContainer: {
    zIndex: 2,
    alignItems: 'left',
    right: 55,
    right: 55,
  },
  attributeNames: {
    zIndex: 2,
    fontSize: 26.5,
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
