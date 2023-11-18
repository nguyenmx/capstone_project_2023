import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Heart from '../images/Heart.png';

const window = Dimensions.get('window');

const HealthBar = () => {
  const [health, setHealth] = useState(100);
  const maxHealth = 100;

  const healthPercentage = (health / maxHealth) * 100;

  // Determine the color based on health level
  const healthColor = healthPercentage > 30 ? 'green' : 'red';

  const decreaseHealth = () => {
    const newHealth = Math.max(0, health - 10);
    setHealth(newHealth);
  };

  const increaseHealth = () => {
    const newHealth = Math.min(maxHealth, health + 10); // Ensure health doesn't exceed maxHealth
    setHealth(newHealth);
  };

 
  return (
    <View style={styles.healthBarContainer}>
      <View style={styles.healthRow}>
        <Image source={Heart} style={styles.heartIcon} />
        <View style={styles.healthBar}>
          <View style={[styles.healthBarInner, { width: `${healthPercentage}%`, backgroundColor: healthColor }]} />
        </View>
        <Text style={styles.healthText}>
          {health}/{maxHealth}
        </Text>
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
};

const styles = StyleSheet.create({
  healthBarContainer: {
    alignItems: 'center',
    top: window.height * -0.2,
    left: window.width * -0.2,
    position: 'relative',
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  healthBar: {
    height: 30,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 4,
    overflow: 'hidden',
  },
  healthBarInner: {
    backgroundColor: '#ff1a1a',
    height: '100%',
    borderRadius: 3,
  },
  healthText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
  },
  healthButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default HealthBar;