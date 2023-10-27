import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const window = Dimensions.get('window');

const MG = () => {
  return (
    <ImageBackground
      source={require('../../images/zkx9_iwg1_210415.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={false}
        horizontal={true} // Slide from left to right
      >
        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 1</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 3</Text>
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
    flex: 1, // Take the full available space
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor : "#0000" // invisible color
  },
  slideInner: {
    width: '80%', // Use 80% of the screen width
    height: '80%', // Use 80% of the screen height
    borderWidth: 10, // Border width
    borderColor: 'rgba(156, 130, 176, 0.8)', // Border color
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 232, 255, 0.8)',
    borderRadius: 20,
  },
  backgroundImage: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  howToPlayText: {
    fontSize: window.width * 0.09,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', // Center the text horizontally
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: window.width * 0.09,
    marginBottom: window.height * 0.83,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // A high zIndex value to render it above everything
    marginBottom: window.height * 0.83,
  },
  

});

export default MG;


