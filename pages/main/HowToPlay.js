import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import lvlUp from '../../images/HowToPlay/themducks.png'
import feedDuck from '../../images/HowToPlay/hungryDuck.png'
import fightDuck from '../../images/HowToPlay/fightDuck.png'

const window = Dimensions.get('window');

const HowToPlay = () => {

  const navigation = useNavigation(); // Get the navigation object

  return (
    <ImageBackground
      source={require('../../images/Backgrounds/zkx9_iwg1_210415.jpg')}
      style={styles.backgroundImage}
    >
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={false}
        horizontal={true}
      >
        <View style={styles.slide}>
        
          <View style={styles.slideInner}>
            <Text style={styles.text}>1</Text>
            <View style={styles.iconDescription}>
              <Image source={lvlUp} style={styles.lvlUp} />
              <Text style={styles.desc}>Level up your gremlin by partaking in real-world activity with step-tracker, unlocking exciting milestones and ensuring a healthier, more active pet!</Text>
            </View>
          </View>

        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>2</Text>
            <View style={styles.iconDescription}>
              <Image source={feedDuck} style={styles.feedDuck} />
              <Text style={styles.desc}> Buy and feed your gremlin some food to increase his/her's happiness!</Text>
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>3</Text>
            <View style={styles.iconDescription}>
              <Image source={fightDuck} style={styles.fightDuck} />
              <Text style={styles.desc}> Your gremlin wants to engage in Combat Mode. Increase your daily steps to make your gremlin the best fighter!</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.slide}>
          <View style={styles.slideInner}>
          <Text style={styles.text}>4</Text>
          <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('PetHouse')}>
              <Text style={styles.buttonText}>PetHouse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('ItemShop')}>
              <Text style={styles.buttonText}>ItemShop</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('PetHouseLandscape')}>
              <Text style={styles.buttonText}>PetHouseLandscape</Text>
            </TouchableOpacity> */}
          </View>
        </View>

      </Swiper>

      <View style={styles.overlay}>
        <Image source={require('../../images/Banner_Blank.png')} style={styles.banner} ></Image>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    
  },
  slide: {
    zIndex: 998,
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    // shadowOffset: { width: 10, height: 10 },
    // shadowColor: 'black',
    // shadowOpacity: 1,
    elevation: 3,
    backgroundColor : "#0000" 
  },
  slideInner: {
    width: '85%',
    height: '65%', 
    borderWidth: 10, 
    borderColor: 'rgba(147, 124, 191, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(191, 167, 220, 0.8)',
    borderRadius: 20,
    elevation: 7,
  },
  feedDuck: {
    top: window.height * -0.1
  },
  fightDuck: {
    top: window.height * -0.10
  },
  backgroundImage: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  banner: {
    transform: [{ scale: .2 }],
    top:window.height * .02,
  },
  iconDescription: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  howToPlayText: {
    fontSize: window.width * 0.074,
    color: 'purple',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    zIndex:999,
    top:window.height * .11,
  },
  lvlUp: {
    width:  500,
    height: 290,
    marginBottom: 20,
    transform: [{ scale: .5 }]
  },
  text: {
    fontSize: window.width * 0.09,
    marginBottom: window.height * 0.83,
    top: window.height * -0.03,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  overlay: {
    position: 'absolute',
    top: window.height * -0.05,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    marginBottom: window.height * 0.83,
  },
  button: {
    width: window.width * 0.5,
    height: window.height * 0.08,
    backgroundColor: '#e9f1ff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 5, 
    borderColor: 'white',
    marginBottom: window.height * -0.1,
    position: 'absolute'

  },
  Backbutton: {
    width: window.width * 0.4,
    height: window.height * 0.065,
    backgroundColor: '#e9f1ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: window.height * 0.02, // Adjust the marginBottom value to move the button down
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#91adfa'
  },
  desc: {
    fontSize: window.width * 0.07,
    color: '#ffffff',
    fontWeight: 'light',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    textShadowColor: 'rgba(0,0,0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  // foodDesc: {
  //   fontSize: window.width * 0.07,
  //   top: window.height * -0.07,
  //   color: '#ffffff',
  //   fontWeight: 'light',
  //   fontFamily: 'NiceTango-K7XYo',
  //   textAlign: 'center', 
  //   textShadowColor: 'rgba(0,0,0, 0.7)',
  //   textShadowOffset: { width: 1, height: 1 },
  //   textShadowRadius: 5,
  // },
    desc: {
    fontSize: window.width * 0.07,
    top: -75,
    color: '#ffffff',
    fontWeight: 'light',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    textShadowColor: 'rgba(0,0,0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonText: {
    color: '#91adfa',
    fontFamily: 'NiceTango-K7XYo',
    position: 'relative',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: window.width * 0.08,
  },
});

export default HowToPlay;
