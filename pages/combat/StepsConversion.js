import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';


const window = Dimensions.get('window');
const backgroundImage = require('../../images/StepsConversion/combatbackground.png');

const StepsConversion = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <Image source={require('../../images/StepsConversion/combatinfo.png')} style={styles.infoBanner} />
      <Image source={require('../../images/StepsConversion/fatalitylogo.png')} style={styles.fatalityLogo} />
      </ImageBackground>
    </View>
  );
};

export default StepsConversion;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoBanner: {
    top: window.height * 0.2,
    height: window.height * 0.6,
    width: window.width * 0.9
  },
  fatalityLogo: {
    top: window.height * 0.2,
    height: window.height * 0.2,
    width: window.width * 0.7
  }
});