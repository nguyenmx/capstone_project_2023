import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const MG = () => {
  return (
    <ImageBackground
      source={require('../../images/zkx9_iwg1_210415.jpg')} // Replace with the path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.text}>How To Play</Text>
        {
          /* Add your content for the Main Game screen */
        }
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: window.width * 0.09,
    marginBottom: window.height * 0.83, 
    color: 'white',
    fontFamily: 'NiceTango-K7XYo'
  },
});

export default MG;
