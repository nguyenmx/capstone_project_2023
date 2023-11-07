import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import duck from '../images/ducky.gif';

const window = Dimensions.get('window');

const Animal = () => {
  const imageWidth = window.width * 0.55; // adjust the scaling factor as needed
  const imageHeight = imageWidth; // maintain aspect ratio

  return (
    <View>
      <Image source={duck} style={{ width: imageWidth, height: imageHeight }} />
    </View>
  );
};

export default Animal;
