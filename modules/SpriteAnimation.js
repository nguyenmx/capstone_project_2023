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

  const handleAnimationSwitch = () => {
    setAnimationType((prevType) => {
      const animationTypes = Object.keys(animations);
      const currentIndex = animationTypes.indexOf(prevType);
      const nextIndex = (currentIndex + 1) % animationTypes.length;
      return animationTypes[nextIndex];
    });
  };

  const handleSpritePress = () => {
    handleAnimationSwitch();
    setTimeout(() => {
      handleAnimationSwitch();
    }, animations[animationType].length * 150);
  };

  useEffect(() => {
    return playAnimation(animations[animationType]);
  }, [animationType]);

  return (
    <View >
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
    position: 'relative',
  },
});

export default SpriteAnimation;
