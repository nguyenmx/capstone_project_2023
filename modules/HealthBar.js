import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');


const HealthBar = () => {

  const [health, setHealth] = useState(100);
  const maxHealth = 100;

  const decreaseHealth = () => {
    const newHealth = Math.max(0, health - 10); // Ensure health doesn't go below 0
    setHealth(newHealth);
  };

  const increaseHealth = () => {
    const newHealth = Math.min(maxHealth, health + 10); // Ensure health doesn't exceed maxHealth
    setHealth(newHealth);
  };


  return (
    <View style={styles.healthBarContainer}>
      <View style={styles.healthBar}>
        <View style={[styles.healthBarInner, { width: `${(health / maxHealth) * 100}%` }]} />
      </View>
      <Text style={styles.healthText}>{health}/{maxHealth}</Text>

      <TouchableOpacity style={styles.healthButton} onPress={decreaseHealth}>
        <Text style={styles.buttonText}>Decrease Health</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.healthButton} onPress={increaseHealth}>
        <Text style={styles.buttonText}>Increase Health</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  healthBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    top: window.height * -.2,
    left: window.width * -.2,
    position: 'relative',
  },
  healthBar: {
    height: 20,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 4,
    overflow: 'hidden',
  },
  healthBarInner: {
    backgroundColor: '#ff1a1a',
    height: '100%',
    borderRadius: 10,
  },
  healthText: {
    marginTop: 5,
    fontSize: 16,
    color: 'white',
  },
  healthButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default HealthBar;
