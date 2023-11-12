import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import explosion from '../images/explosion.gif';

const window = Dimensions.get('window');

const Explosion = () => {
  const imageWidth = window.width * 0.55; // adjust the scaling factor as needed
  const imageHeight = imageWidth; // maintain aspect ratio

  return (
    <View>
      <Image source={explosion} style={{ width: imageWidth, height: imageHeight }} />
    </View>
  );
};

export default Explosion;