import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const window = Dimensions.get('window');

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

  const celebrateFrames = [
    require('../images/CharacterSheet/CharacterSheet-10.png'),
    require('../images/CharacterSheet/CharacterSheet-11.png'),
    require('../images/CharacterSheet/CharacterSheet-12.png'),
    require('../images/CharacterSheet/CharacterSheet-13.png'),
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

  const celebrateAnimation = () => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % celebrateFrames.length);
    }, 150);

    return () => {
      clearInterval(intervalId);
    };
  };

  const handleAnimationSwitch = () => {
    // Switch between idle, walk, and celebrate animations
    setAnimationType((prevType) => {
      if (prevType === 'idle') {
        return 'walk';
      } else if (prevType === 'walk') {
        return 'celebrate';
      } else {
        return 'idle';
      }
    });
  };

  const handleSpritePress = () => {
    // Play celebrate animation twice when sprite is clicked
    handleAnimationSwitch();
    setTimeout(() => {
      handleAnimationSwitch();
    }, celebrateFrames.length * 150); // Adjust the timeout based on the celebrate animation length
  };

  useEffect(() => {
    if (animationType === 'idle') {
      return idleAnimation();
    } else if (animationType === 'walk') {
      return walkAnimation();
    } else if (animationType === 'celebrate') {
      return celebrateAnimation();
    }
  }, [animationType]);

  return (
    <View>
      <TouchableOpacity onPress={handleSpritePress}>
        <Image
          source={
            animationType === 'idle'
              ? spriteFrames[frameIndex]
              : animationType === 'walk'
              ? walkFrames[frameIndex]
              : celebrateFrames[frameIndex]
          }
          style={styles.sprite}
        />
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
    width: window.width * 0.58, 
    height: window.width * 0.58,
    position: 'relative',
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
