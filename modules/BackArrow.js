import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import back from '../images/back.png';

const window = Dimensions.get('window');

const BackArrow = () => {
  const imageWidth = window.width * 0.10; // adjust the scaling factor as needed
  const imageHeight = imageWidth; // maintain aspect ratio

  return (
    <View>
      <Image source={back} style={{ width: imageWidth, height: imageHeight}} />
    </View>
  );
};

export default BackArrow;
