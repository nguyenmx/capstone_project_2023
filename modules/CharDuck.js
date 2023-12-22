import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import SpriteAnimation from './SpriteAnimation'; // Import the SpriteAnimation component

const window = Dimensions.get('window');

const Duck = ({ duckType, Optional: customStyle }) => {
  let duckContent;

  switch (duckType) {
    case 0:
      duckContent = <Image source={require('../images/PlayableAnimals/duckWave.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 1:
      duckContent = <Image source={require('../images/PlayableAnimals/capyKnife.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 2:
      duckContent = <Image source={require('../images/PlayableAnimals/duckRizz.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 3:
      duckContent = <Image source={require('../images/PlayableAnimals/duckCoffee.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 4:
      duckContent = <Image source={require('../images/PlayableAnimals/ducky.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 5:
      duckContent = <SpriteAnimation />;
      break;
    default:
      duckContent = <Image source={require('../images/PlayableAnimals/duckWave.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
  }

  const imageWidth = window.width * 0.58; 
  const imageHeight = imageWidth;

  return (
    <View style={[{ position: 'relative' }, customStyle]}>
      {duckContent}
    </View>
  );
};

export default Duck;

