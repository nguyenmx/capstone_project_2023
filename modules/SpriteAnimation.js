import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SpriteAnimation = ({ onIdleAnimationFinish }) => {
  const [frameIndex, setFrameIndex] = useState(0); // Initial frame index
  const [animationType, setAnimationType] = useState('idle');

  const spriteFrames = [
    require('../images/CharacterSheet/CharacterSheet-0.png'),
    require('../images/CharacterSheet/CharacterSheet-1.png'),
    // Add more frames as needed
  ];

  const walkFrames = [
    require('../images/CharacterSheet/CharacterSheet-6.png'),
    require('../images/CharacterSheet/CharacterSheet-7.png'),
    require('../images/CharacterSheet/CharacterSheet-8.png'),
    require('../images/CharacterSheet/CharacterSheet-9.png'),
    // Add more walk frames as needed
  ];

  const idleAnimation = () => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % spriteFrames.length);
    }, 150);

    const cleanup = () => {
      clearInterval(intervalId);
      onIdleAnimationFinish && onIdleAnimationFinish();
    };

    return cleanup;
  };


  const walkAnimation = () => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % walkFrames.length);
    }, 150);

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
      <View>
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
    position: 'relative',
  },
  sprite: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  button: {
    top: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    position: 'relative'
  },
});

export default SpriteAnimation;
