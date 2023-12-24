import React from 'react';
import { View, ImageBackground, Text, Image, Dimensions, StyleSheet } from 'react-native';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';

const window = Dimensions.get('window');

class Shop extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../../images/Backgrounds/CoinShop.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={[{ position: 'absolute', top: 125, left: 45}]} >
          <View style={styles.priceContainer}>
            <Image source={diamond} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5}]}></Image>
            <View style={styles.rect}></View>
          </View>

          <View>
            <Image source={coin} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5}]}></Image>
            <View style={styles.rect}></View>
          </View>
        </View>

        <View style={[styles.container, { top: window.width * .24 }]}>
          <View style={styles.shopItem}>
            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/Apple.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$1.49</Text>

              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>

            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/Bread.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$1.49</Text>
              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>

            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/Cheese.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$3.99</Text>
              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>
          </View>
        </View>
        <View style={[styles.container, { marginTop: window.width * -0.33 }]}>
          <View style={styles.shopItem}>
            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/Carton_Blue.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$1.49</Text>

              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>

            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/Beef_Grilled.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$1.49</Text>
              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>

            <View style={styles.itemContainer}>
              <Image source={require('../../images/Food/CannedFood_Fish.png')} style={styles.itemImage} />
              <Text style={styles.itemPrice}>$3.99</Text>
              <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />

            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  rect:{
    width: 130,
    height: 42,
    backgroundColor: '#C6A2FD',
    padding: 10,
    borderRadius: 15,
    marginBottom: window.height * -0.1,
    position: 'absolute'
  },
  priceContainer:{
    left: 145,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyBttn:{
    width: 109,
    height: 42,
  },
  itemImage: {
    width: 85,
    height: 85,
    marginVertical: -12
  },
  itemPrice: {
    fontSize: 18,
    color: 'black',
    top: 32,
    zIndex: 998
  },
});

export default Shop;
