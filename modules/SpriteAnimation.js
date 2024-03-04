import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SpriteAnimation = ({
  onIdleAnimationFinish,
  idleFrames,
  walkFrames,
  celebrateFrames,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [animationType, setAnimationType] = useState('idle');

  const animations = {
    idle: idleFrames,
    walk: walkFrames,
    celebrate: celebrateFrames,
  };

  const playAnimation = (frames) => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 150);

    return () => {
      clearInterval(intervalId);
    };
  };

  const switchToNextAnimation = () => {
    setAnimationType((prevType) => {
      const animationTypes = Object.keys(animations);
      const currentIndex = animationTypes.indexOf(prevType);
      const nextIndex = (currentIndex + 1) % animationTypes.length;
      return animationTypes[nextIndex];
    });
  };

  const handleSpritePress = () => {
    switchToNextAnimation();
    setTimeout(() => {
      switchToNextAnimation();
    }, animations[animationType].length * 150); // Switch back after current animation frames
  };

  useEffect(() => {
    const switchAnimationTimer = setTimeout(() => {
      switchToNextAnimation();
    }, 10000); // Change animation every 3 seconds

    return () => clearTimeout(switchAnimationTimer);
  }, [animationType]);

  useEffect(() => {
    return playAnimation(animations[animationType]);
  }, [animationType]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSpritePress}>
        <Image
          source={animations[animationType][frameIndex]}
          style={styles.sprite}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  sprite: {
    width: window.width * 0.58,
    height: window.width * 0.58,
    position: 'relative',
  },
});

export default SpriteAnimation;
