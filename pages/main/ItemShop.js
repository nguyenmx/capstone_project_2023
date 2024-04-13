import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import Currency from './Currency';
import { Audio } from 'expo-av';
import mango from '../../images/Food/Mango.png';
import boba from '../../images/Food/Bobba_Green.png';
import salad from '../../images/Food/Salat.png';
import burger from '../../images/Food/Burger.png';
import shrimp from '../../images/Food/Shrimp.png';
import lemonade from '../../images/Food/Drink_Lemonade.png';
import ItemModal from '../main/ItemModal';

const window = Dimensions.get('window');

const ItemShop = () => {
  const [foodItems, setFoodItems] = useState([
    { id: 13, imageSource: require('../../images/ShopItems/StarPotion_Blue.png'), price: 5, currencyType: 'coins' },
    { id: 14, imageSource: require('../../images/ShopItems/LovelyPotion_Purple.png'), price: 10, currencyType: 'coins' },
  ]);
  const [otherItems, setOtherItems] = useState([
    { id: 15, imageSource: require('../../images/ShopItems/HealthPotion_Strong.png'), price: 1, currencyType: 'diamonds' },
    { id: 16, imageSource: require('../../images/ShopItems/HealthPotion_Medium.png'), price: 3, currencyType: 'diamonds' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemID, setItemID] = useState(null);


  const switchShopItems = () => {
    setFoodItems([
      { id: 17, imageSource: boba, price: 4, currencyType: 'coins' },
      { id: 18, imageSource: shrimp, price: 24, currencyType: 'coins' },
      { id: 19, imageSource: mango, price: 12, currencyType: 'coins' }
    ]);
    setOtherItems([
      { id: 10, imageSource: salad, price: 8, currencyType: 'coins' },
      { id: 11, imageSource: burger, price: 11, currencyType: 'coins' },
      { id: 12, imageSource: lemonade, price: 4, currencyType: 'diamonds' }
    ]);
  };

  const handleFoodItemPress = (item) => {
    setSelectedItem(item.imageSource);
    setItemID(item.id);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setItemID(null);
    setIsModalVisible(false);
  };

  const handleBuyPress = async (item) => {
    // Your buy press logic here
  };

  const renderShopItem = (item) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleFoodItemPress(item)}> 
        <Image source={item.imageSource} style={styles.itemImage} />
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => handleBuyPress(item)}>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Image source={item.currencyType === 'coins' ? coin : diamond} style={styles.currencyIcon} />
        </View>
        <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />
      </TouchableOpacity>
    </View>
  );


  return (
    <ImageBackground
      source={require('../../images/Backgrounds/CoinShop2.png')}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <View>
        <Currency optionalStyles={{ top: 140, left: window.width * .12 }} />
      </View>

      <View style={[styles.container, { top: 160 }]}>
        <View style={styles.shopItem}>
          {foodItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderShopItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>

      <View style={[styles.container, { marginBottom: 40 }]}>
        <View style={styles.shopItem}>
          {otherItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderShopItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>
      <ItemModal visible={isModalVisible} item={selectedItem} itemID={itemID} onClose={handleCloseModal} />

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    marginHorizontal: 7,
  },
  buyBttn: {
    width: 109,
    height: 42,
  },
  itemImage: {
    width: 140,
    height: 140,
    marginVertical: -49,
  },
  itemPrice: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 36,
    color: 'white',
    top: 45,
    left: 25,
    zIndex: 998,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 998,
  },
  currencyIcon: {
    width: 25,
    height: 25,
    top: 42,
    left: 32,
  },
  timerText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    bottom: window.height * -.29,
  },
});

export default ItemShop;
