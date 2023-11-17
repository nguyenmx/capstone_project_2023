import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainGameLogic = () => {
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(50); // Initial happiness level
  const minHealth = 0;
  const maxHealth = 100;
  const healthDecreaseInterval = 5000; // Decrease health every 5 seconds
  const healthDecreasePercentage = 10; // Decrease health by 10% per interval

  const increaseHealth = () => {
    const newHealth = health + 10;
    setHealth(Math.min(newHealth, maxHealth));
  };

  const decreaseHealth = () => {
    const newHealth = health - 10;
    setHealth(Math.max(newHealth, minHealth));
  };

  useEffect(() => {
    const healthDecreaseTimer = setInterval(() => {
      const reductionAmount = (health * healthDecreasePercentage) / 100;
      const newHealth = health - reductionAmount;

      setHealth(Math.max(newHealth, minHealth));
    }, healthDecreaseInterval);

    return () => clearInterval(healthDecreaseTimer);
  }, [health]);

  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.healthText}>Health: {health}</Text>
      <Button title="Feed" onPress={increaseHealth} />
      <Button title="Poke" onPress={decreaseHealth} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 30, // Adjust the positioning as needed
    zIndex: 1, // Adjust the z-index to control the stacking order
    flexDirection: 'column',
    alignItems: 'center',
  },
  healthText: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default MainGameLogic;
