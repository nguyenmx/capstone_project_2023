// FightScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FightScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Fight Screen!</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('CombatMode')} // Navigate back to the Combat Mode Screen
      >
        <Text style={styles.buttonText}>Back To Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24, // Customize the font size
    fontWeight: 'bold', // Customize the font weight
  },
  buttonContainer: {
    backgroundColor: '#8BE3FF',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default FightScreen;
