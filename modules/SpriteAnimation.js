import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SpriteAnimation = () => {
  const [frameIndex, setFrameIndex] = useState(0); // Initial frame index
  const [animationType, setAnimationType] = useState('idle');

  const spriteFrames = [
    require('../images/CharacterSheet/CharacterSheet-0.png'),
    require('../images/CharacterSheet/CharacterSheet-1.png'),
    // Add more frames as needed
  ];

  const walkFrames = [
    require('../images/CharacterSheet/CharacterSheet-2.png'),
    require('../images/CharacterSheet/CharacterSheet-3.png'),
    require('../images/CharacterSheet/CharacterSheet-4.png'),
    require('../images/CharacterSheet/CharacterSheet-5.png'),
    require('../images/CharacterSheet/CharacterSheet-5.png'),
    require('../images/CharacterSheet/CharacterSheet-5.png'),

    // Add more walk frames as needed
  ];

  const idleAnimation = () => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % spriteFrames.length);
    }, 150);

    return () => {
      clearInterval(intervalId);
    };
  };

  const walkAnimation = () => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % walkFrames.length);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  };

  const handleAnimationSwitch = () => {
    // Switch between idle and walk animations
    setAnimationType((prevType) => (prevType === 'idle' ? 'walk' : 'idle'));
  };

  useEffect(() => {
    if (animationType === 'idle') {
      return idleAnimation();
    } else if (animationType === 'walk') {
      return walkAnimation();
    }
  }, [animationType]);

  return (
      <View style={styles.container}>
        <Image source={animationType === 'idle' ? spriteFrames[frameIndex] : walkFrames[frameIndex]} style={styles.sprite} />
        <TouchableOpacity onPress={handleAnimationSwitch} style={styles.button}>
          <Text>Switch Animation</Text>
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
  sprite: {
    width: 200,
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default SpriteAnimation;
