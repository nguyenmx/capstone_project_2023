import React, {Component} from 'react';
import { View, Image } from 'react-native';
import duck from '../images/ducky.gif'

const Animal = () => {
  return (
    <View>
      {
        <Image source={duck}></Image>
      }
    </View>
  );
};

export default Animal;