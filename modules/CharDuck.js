import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const Duck = ({ duckType }) => {
  let duckImage;
  switch (duckType) {
    case 0:
      duckImage = require('../images/duckWave.gif');
      break;
    case 1:
      duckImage = require('../images/ducky.gif');
      break;
    case 2:
      duckImage = require('../images/duckRizz.gif');
      break;
    case 3:
      duckImage = require('../images/duckCoffee.gif');
      break;
    default:
      duckImage = require('../images/duckWave.gif');
      break;
  }

  const imageWidth = window.width * 0.47; // adjust the scaling factor as needed
  const imageHeight = imageWidth; // maintain aspect ratio

  return (
    <View>
      <Image source={duckImage} style={{ width: imageWidth, height: imageHeight }} />
    </View>
  );
};

export default Duck;
