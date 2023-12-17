import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import rectangle from '../../images/ItemShop/Rectangle.png';
import shopIcon from '../../images/ItemShop/shopImg.png';
import shopPic from '../../images/ItemShop/shopPic.png';
import box from '../../images/ItemShop/box.png';
import meat from '../../images/ItemShop/meat.png';
import carrot from '../../images/ItemShop/carrot.png'
import salad from '../../images/ItemShop/Salad.png'
import UseOrientation from '../../components/UseOrientation';

const window = Dimensions.get('window');
const backgroundImage = require('../../images/ItemShop/pawsBackground.png');

const ItemShop = ({ navigation }) => {
  const orientation = UseOrientation();

  console.log(orientation)
  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style = {styles.rectangleContainer} isPortrait={orientation.isPortrait}> 
            <Image source={shopPic}></Image>
            <Image source={shopIcon}></Image>
            <Image source={rectangle} style= {styles.rectangle}></Image>
            <Image source={rectangle} style= {styles.rectangle}></Image>
            <Image source={rectangle} style= {styles.rectangle}></Image>
            <Image source={rectangle} style= {styles.rectangle}></Image>
        </View>

        <View style = {styles.itemOptionsContainer}> 
            <Image source={meat} style= {styles.item}></Image>
            <Image source={carrot} style= {styles.item}></Image>
            <Image source={salad} style= {styles.item}></Image>
            <Image source={box} style= {styles.item}></Image>
        </View>

      </ImageBackground>
    </View>
  );
};

export default ItemShop;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rectangleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 24
  },
  rectangle: {
    marginTop: 5
  },
  itemOptionsContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: window.width * 0.50,
  },
  item: {
    margin: 32,
    marginLeft: -190
  },
});
