import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import arrow from '../images/LeftArrow.png';

const window = Dimensions.get('window');

const BackArrow = () => {
  const imageWidth = window.width * 0.13; // adjust the scaling factor as needed
  const imageHeight = imageWidth; // maintain aspect ratio
  const topCorner = 0;
  const leftCorner = -140;

  return (
    <View>
      <Image source={arrow} style={{ width: imageWidth, height: imageHeight, top: topCorner, left: leftCorner}} />
    </View>
  );
};

export default BackArrow;
