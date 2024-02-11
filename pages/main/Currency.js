import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import coinImage from '../../images/PetHouse/Portrait/coin.png';
import diamondImage from '../../images/PetHouse/Portrait/diamond.png';
import { useCurrency } from '../../pages/main/CurrencyContext';
const window = Dimensions.get('window');

const Currency = () => {
  const { coins, diamonds, earnCurrency } = useCurrency();

  return (
/*
    <View style={[{ position: 'absolute', top: 125, left: 45 }]}>
    <View style={styles.priceContainer}>
      <Image source={diamond} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5 }]}></Image>
      <View style={styles.rect}></View>
    </View>

    <View>
      <Image source={coin} style={[{ position: 'relative', zIndex: 998, top: -24, left: 10, height: 35, width: 35 }]}></Image>
      <Image source={coin} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5 }]}></Image>
      <View style={styles.rect}></View>
    </View>
  </View>
  */

    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Image source={coinImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}>{coins}</Text>
        <TouchableOpacity onPress={() => earnCurrency('coins')} style={[styles.button, {marginTop: 10}]}>
          <Text style={styles.buttonText}>Earn Coins</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Image source={diamondImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}>{diamonds}</Text>
        <TouchableOpacity onPress={() => earnCurrency('diamonds')} style={[styles.button, {marginTop: 10}]}>
          <Text style={styles.buttonText}>Earn Diamonds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    left: -130,
    position: 'absolute',
  },
  currencyContainer: {
    width: 130,
    height: 42,
    backgroundColor: '#C6A2FD',
    padding: 10,
    borderRadius: 25,
    position: 'absolute',
    flexDirection: 'row',

  },
  currencyImage: {
    width: 30,
    height: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    left: 145,
  },
  
  currencyText: {
    fontSize: 35,
    marginBottom: 10,
    color: 'green',
    fontFamily: 'NiceTango-K7XYo',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Currency;
