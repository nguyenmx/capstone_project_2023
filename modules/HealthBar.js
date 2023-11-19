import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Heart from '../images/Heart.png';

const window = Dimensions.get('window');

const HealthBar = ({ Optional: customStyle }) => {
  const [health, setHealth] = useState(100);
  const maxHealth = 100;

  const healthPercentage = (health / maxHealth) * 100;

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
    <View style={[styles.healthBarContainer, customStyle]}>
      {/* Heart Icon (Part of healthBarContainer) */}
      <Image source={Heart} style={styles.heartIcon} />

      {/* Health Bar and Text (Part of healthBarContainer) */}
      <View style={styles.healthRow}>
        <View style={styles.healthBar}>
          <View style={[styles.healthBarInner, { width: `${healthPercentage}%`, backgroundColor: healthColor }]} />
        </View>
        <Text style={styles.healthText}> {health}/{maxHealth}</Text>
      </View>

      {/* Buttons (Part of healthBarContainer) */}
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
    right: window.width * .3,
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
  },
  buttonText: {
    color: 'white',
  },
});

export default HealthBar;
