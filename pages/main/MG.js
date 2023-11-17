import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import lvlUp from '../../images/themducks.png'

const window = Dimensions.get('window');

const MG = () => {

  const navigation = useNavigation(); // Get the navigation object

  return (
    <ImageBackground
      source={require('../../images/zkx9_iwg1_210415.jpg')}
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
            <Image source={lvlUp} style={styles.lvlUp} />
            <Text style={styles.desc}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique id ipsum non tristique!</Text>
          </View>

        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>2</Text>
            <Text style={styles.desc}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique id ipsum non tristique!</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>3</Text>
            <Text style={styles.desc}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique id ipsum non tristique!</Text>
            <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('PetHouse')}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>

      <View style={styles.overlay}>
        <Text style={styles.howToPlayText}>How to Play</Text>
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
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor : "#0000" 
  },
  slideInner: {
    width: '80%',
    height: '72%', 
    borderWidth: 10, 
    borderColor: 'rgba(156, 130, 176, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 232, 255, 0.8)',
    borderRadius: 20,
    elevation: 7,
  },
  backgroundImage: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  howToPlayText: {
    fontSize: window.width * 0.094,
    marginBottom: window.height * -0.83,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
    top: window.height * -0.082,
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
  },
  desc: {
    fontSize: window.width * 0.08,
    top: -75,
    color: '#ffffff',
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

export default MG;
