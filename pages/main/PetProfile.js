import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import pp from '../../images/ProfilePage/pink_stripes.gif';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import { duckData } from '../../modules/CharDuck'; // Adjust path as needed
import FriendshipLevel from '../../components/main_game_logic/FriendshipLevel';
import BackArrow from '../../modules/BackArrow';
import Settings from '../../modules/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playSound } from '../../pages/main/PetHouse';
import pencil from '../../images/ProfilePage/Icon_Pencil.png'
import FlipCard from 'react-native-flip-card'; 
import { useReferenceData } from '../../components/ReferenceDataContext';
import star from '../../images/Icon_Small_Star.png';
const window = Dimensions.get('window');
const backgroundImage = pp;

const PetProfile = ({ navigation }) => {
  const { selectedDuck } = useContext(ReferenceDataContext);
  const [isFlipped, setIsFlipped] = useState(false); 
  const { mood } = useReferenceData();
  const moodColor = mood === 'Happy' ? 'green' : (mood === 'OK' ? 'orange' : 'red');

  //Try not to spam, keeps on flipping
  const toggleFlip = () => { 
      setIsFlipped(!isFlipped); 
  }; 
  
  const navigateToScreen1 = () => {
    navigation.navigate('PetHouse');
  };

  const navigateToScreen2 = () => {
    navigation.navigate('PetProfile');
  };

  const getColorForSelectedDuck = () => {
    return duckData[selectedDuck].color; // Ensure each duck has a 'color' attribute
  };

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Settings/>

          <TouchableOpacity onPress={toggleFlip}>
          <FlipCard
            flip={isFlipped}
            flipHorizontal={true}
            flipVertical={false}
            clickable={false}
            onFlipEnd={(isFlipped) => setIsFlipped(isFlipped)}
            style={styles.flipCard}
          >
            {/* Front View */}
            <View style={styles.flipCard}>
              
            <View style={[styles.topHalf, { backgroundColor: getColorForSelectedDuck() }]}> 
              <Image source={ duckData[selectedDuck].imageSource } style={{position: 'absolute',zIndex: 999, width: 180, height: 180, bottom: 40, }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', top: -3 }}>
                <Text style={styles.profileIconText}>
                  <TouchableOpacity >
                    <Image source={star} style={{width: 40, height: 38, top:-9, left:-5}} />
                  </TouchableOpacity>{duckData[selectedDuck].name}
                  <TouchableOpacity >
                    <Image source={pencil} style={{width: 34, height: 41 , transform: [{ scaleX: -1 }, { scaleY: -1 }] }} />
                  </TouchableOpacity>
                </Text>
              </View>
              
            </View>
            
            <View style={styles.bottomHalf}>

              <View style={styles.attributeRow}>
                <Text style={styles.attributeNames}>Animal:</Text>
                <Text style={styles.attributeNames}>  {duckData[selectedDuck].species}</Text>
              </View>      

              <View style={styles.attributeRow}>
                <Text style={styles.attributeNames}>Favorite Food:  </Text>
                <Image source={duckData[selectedDuck].favorite_food} style={styles.itemImage} />
              </View>

              <View style={styles.attributeRow}>
                <Text style={styles.attributeNames}>Hated Food: </Text>
                <Image source={duckData[selectedDuck].hate} style={styles.itemImage} />
              </View>

              <View style={styles.attributeRow}>
                <Text style={styles.attributeNames}>Gender: </Text>
                <Image source={duckData[selectedDuck].gender} style={styles.itemImage2} />
              </View>

              <Text style={styles.attributeNames2}>Friendship Level:</Text>
              <FriendshipLevel id={selectedDuck} style={{left: 10, marginTop:-15}} />

            </View>

            </View>
            {/* Back View */}
            <View style={styles.flipCard}>
            <View style={[styles.topHalf, { backgroundColor: getColorForSelectedDuck() }]}> 
              <Image source={ duckData[selectedDuck].imageSource } style={{position: 'absolute',zIndex: 999, width: 180, height: 180, bottom: 40, transform: [{ scaleX: -1 }] }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', top: -3 }}>
                <Text style={styles.profileIconText}>
                  <TouchableOpacity >
                    <Image source={star} style={{width: 40, height: 38, top:-9, left:-5}} />
                  </TouchableOpacity>{duckData[selectedDuck].name}
                  <TouchableOpacity >
                    <Image source={pencil} style={{width: 34, height: 41 , transform: [{ scaleX: -1 }, { scaleY: -1 }] }} />
                  </TouchableOpacity>
                </Text>
              </View>

            </View>
            <View style={styles.bottomHalf}>

            <View style={styles.attributeRow}>
                <Text style={styles.attributeNames}>Nature: </Text>
                <Text style={styles.attributeNames}>{duckData[selectedDuck].nature}</Text>
            </View>
            
            <View style={styles.attributeRow}>
            <Text style={styles.attributeNames}>Mood:  </Text>
            <Text style={[styles.attributeNames, { color: moodColor }]}>{mood}</Text>
            </View>

            <View style={styles.attributeRow}>
            <Text style={styles.attributeNames}>Fun Fact: {duckData[selectedDuck].fun_fact}</Text>
            </View>

            </View>
            </View>


          </FlipCard>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('PetHouse')}>
            <Text style={styles.bottomButtonText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('PetProfile')}>
            <Text style={styles.bottomButtonText}>Pets</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};


export default PetProfile;


const styles = StyleSheet.create({
  flipCard: {
    width: 345,
    height: 570,
    position: 'relative',
    top: 70
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemImage: {
    width: 75,
    height: 75,
  },
  itemImage2: {
    width: 55,
    height: 55,
    bottom:-20
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
    width: '1%',
    height: '0.5%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 140,
    
  },
  topHalf: {
    flex: .22,
    borderTopLeftRadius: 59,
    borderTopRightRadius: 59,
    backgroundColor: 'rgba(190, 208, 232, 1)',
    width: '101%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
    left: -159,
    zIndex:1000
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
    color: 'black',
    fontFamily: 'NiceTango-K7XYo',
  },
  attributeNames2: {
    zIndex: 2,
    fontSize: 26.5,
    marginTop: 45,
    color: 'red',
    fontFamily: 'NiceTango-K7XYo',
    left: 18
  },
  mood: {
    zIndex: 2,
    fontSize: 26.5,
    marginTop: 35,
    fontFamily: 'NiceTango-K7XYo',
  },
  attributeValues: {
    zIndex: 2,
    fontSize: 26.5,
    marginTop: 35,
    color: 'pink',
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
