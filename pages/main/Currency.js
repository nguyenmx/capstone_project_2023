import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import coinImage from '../../images/PetHouse/Portrait/coin.png';
import diamondImage from '../../images/PetHouse/Portrait/diamond.png';
import { useCurrency } from '../../components/CurrencyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window');

const Currency = ({ optionalStyles }) => {
  const { coins, diamonds, earnCurrency } = useCurrency();

  return (
    <View style={[styles.container, optionalStyles]}>
      <View style={styles.priceContainer}>
        <Image source={coinImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}> {coins}</Text>
      </View>

      <View style={[styles.priceContainer]}>
        <Image source={diamondImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}> {diamonds}</Text>
      </View>
      <TouchableOpacity onPress={() => earnCurrency('coins')} style={styles.button}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => earnCurrency('diamonds')} style={styles.button}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    left: 2,
    position: 'absolute',
    zIndex:999,
  },
  currencyContainer: {
    width: 130,
    height: 42,
    backgroundColor: '#60864F',
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
    backgroundColor: '#60864F',
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 24,
    marginRight: 10,
  },
  currencyText: {
    fontSize: 38,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
  },
});

export default Currency;
