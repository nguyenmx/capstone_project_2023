import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Heart from '../images/Heart.png';

const window = Dimensions.get('window');

const HealthBar = forwardRef(({ Optional: customStyle, maxHealthProp = 100, currentHealthProp = 100, heartIconSource = Heart }, ref) => {
  const [health, setHealth] = useState(currentHealthProp);
  const [maxHealth, setMaxHealth] = useState(maxHealthProp);

  const healthPercentage = (health / maxHealth) * 100;
  const healthBarColor = healthPercentage > 30 ? 'green' : 'red';


  const decreaseHealth = () => {
    const newHealth = Math.max(0, health - 10);
    setHealth(newHealth);
    console.log("Decreasing health to:", newHealth);
  };

  const decreaseHealth_2 = (number) => {
    const newHealth = Math.max(0, health - number);
    setHealth(newHealth);
    console.log("Decreasing health by", number, "to:", newHealth);
  };

  const increaseHealth = () => {
    const newHealth = Math.min(maxHealth, health + 10);
    setHealth(newHealth);
  };

  const setMaxHealthValue = (newMaxHealth = 100) => {
    setMaxHealth(newMaxHealth);
    if (health > newMaxHealth) {
      setHealth(newMaxHealth);
    }
  };

  const setCurrentHealth = (newHealth) => {
    // Ensure the new health is within valid bounds (0 to maxHealth)
    const clampedHealth = Math.min(Math.max(newHealth, 0), maxHealth);
    setHealth(clampedHealth);
  };

  const getHealth = () => {
    return health;
  };

  const getMaxHealth = () => {
    return maxHealth;
  }

  // Exposing methods through ref
  useImperativeHandle(ref, () => ({
    decreaseHealth,
    decreaseHealth_2,
    increaseHealth,
    setCurrentHealth,
    setMaxHealth: setMaxHealthValue,
    getHealth,
    getMaxHealth,
  }));

  return (
    <View style={[styles.healthBarContainer, customStyle]}>
      <Image source={Heart} style={styles.heartIcon} />
      <View style={styles.healthRow}>
        <View style={styles.healthBar}>
          <View style={[styles.healthBarInner, { width: `${healthPercentage}%`, backgroundColor: healthBarColor }]} />
        </View>
        <Text style={styles.healthText}> {health}/{maxHealth}</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.healthButton} onPress={decreaseHealth}>
          <Text style={styles.buttonText}>Decrease Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.healthButton} onPress={increaseHealth}>
          <Text style={styles.buttonText}>Increase Health</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  healthBarContainer: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 100,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    top: 10,
    flexDirection: 'row',
  },
  heartIcon: {
    width: 60,
    height: 60,
    right: window.width * .33,
    bottom: window.width * -.105,
    zIndex: 99,
  },
  healthBar: {
    height: 22,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 11,
    borderWidth: 2.5,
    overflow: 'hidden',
  },
  healthBarInner: {
    backgroundColor: '#ff1a1a',
    height: '100%',
  },
  healthText: {
    left: 5,
    fontSize: 16,
    color: 'white',
  },
  healthButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    opacity: 0, // Make the buttons invisible
  },
  buttonText: {
    color: 'white',
  },
});

export default HealthBar;
