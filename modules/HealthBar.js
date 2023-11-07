import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import healthBar from '../images/healthBar.png';

const window = Dimensions.get('window');

const HealthBar = () => {
    const imageWidth = window.width * 0.7;
    const imageHeight = imageWidth;


  return (
    <View>
        <View style={styles.barContainer}>
          <Image source={healthBar} style={styles.bar} />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    barContainer: {
        width: window.width * 0.6,
        aspectRatio: 384 / 96, // Adjust the aspect ratio to fit the health bar image
        marginTop: window.height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bar: {
        width: '100%',
        height: '100%',
      },

})

export default HealthBar;