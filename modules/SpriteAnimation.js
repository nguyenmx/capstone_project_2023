import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SpriteAnimation = ({
  onIdleAnimationFinish,
  idleFrames,
  walkFrames,
  celebrateFrames,
  deadFrames,
  playDead, // Prop to trigger playDead animation
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [animationType, setAnimationType] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);

  const animations = {
    idle: idleFrames,
    walk: walkFrames,
    celebrate: celebrateFrames,
    dead: deadFrames,
  };

  const playAnimation = (frames) => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % frames.length;
        if (animationType === 'dead' && nextIndex === frames.length - 1) {
          setIsPlaying(false);
          clearInterval(intervalId); // Stop the animation at the last frame of 'dead'
        }
        return nextIndex;
      });
    }, 150);

    return () => {
      clearInterval(intervalId);
    };
  };

  const switchToNextAnimation = () => {
    setAnimationType((prevType) => {
      if (playDead && prevType !== 'dead') {
        setIsPlaying(false);
        return 'dead'; // Switch to dead animation if playDead is true
      } else {
        setIsPlaying(true);
        const animationTypes = Object.keys(animations);
        let currentIndex = animationTypes.indexOf(prevType);
        currentIndex = (currentIndex + 1) % animationTypes.length;
        return animationTypes[currentIndex];
      }
    });
  };

  const handleSpritePress = () => {
    switchToNextAnimation();
    setTimeout(() => {
      switchToNextAnimation();
    }, animations[animationType].length * 150); // Switch back after current animation frames
  };

  useEffect(() => {
    if (isPlaying) {
      return playAnimation(animations[animationType]);
    }
  }, [isPlaying, animationType]);

  // Effect to handle playDead animation
  useEffect(() => {
    if (playDead && animationType !== 'dead') {
      setAnimationType('dead');
      setTimeout(() => {
        setIsPlaying(false); // Stop the animation after 5 seconds
      }, 5000);
    } else if (playDead && animationType === 'dead') {
      // Set frame index to the last frame of 'dead' animation
      setFrameIndex(deadFrames.length - 1);
      setIsPlaying(false);
    }
  }, [playDead]);

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
