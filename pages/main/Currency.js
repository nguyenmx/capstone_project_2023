import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import coinImage from '../../images/PetHouse/Portrait/coin.png';
import diamondImage from '../../images/PetHouse/Portrait/diamond.png';
import { useCurrency } from '../../pages/main/CurrencyContext';


const Currency = () => {
  const { coins, diamonds, earnCurrency } = useCurrency();

  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        <Image source={coinImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}>{coins}</Text>
        <TouchableOpacity onPress={() => earnCurrency('coins')} style={styles.button}>
          <Text style={styles.buttonText}>Earn Coins</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.currencyContainer}>
        <Image source={diamondImage} style={styles.currencyImage} />
        <Text style={styles.currencyText}>{diamonds}</Text>
        <TouchableOpacity onPress={() => earnCurrency('diamonds')} style={styles.button}>
          <Text style={styles.buttonText}>Earn Diamonds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    position: 'absolute',
  },
  currencyContainer: {
    alignItems: 'center',
  },
  currencyImage: {
    width: 30,
    height: 30,
  },
  currencyText: {
    fontSize: 20,
    marginBottom: 10,
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
