import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTap } from '../components/main_game_logic/TapContext';

const window = Dimensions.get('window');

const SpriteAnimation = ({
  onIdleAnimationFinish,
  idleFrames,
  walkFrames,
  celebrateFrames,
  deadFrames,
  playDead, // Prop to trigger playDead animation
  playCelebrate, // Prop to trigger playCelebrate animation
  decreaseHealth
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [animationType, setAnimationType] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const { handleTap } = useTap();
  

  const animations = {
    idle: idleFrames,
    walk: walkFrames,
    celebrate: celebrateFrames,
    dead: deadFrames,
  };

  

  const playAnimation = (frames, loop = false) => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % frames.length;
        if (!loop && nextIndex === frames.length - 1) {
          setIsPlaying(false);
          clearInterval(intervalId);
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
        return 'dead';
      } else if (playCelebrate && prevType !== 'celebrate') {
        setIsPlaying(false);
        return 'celebrate';
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
    if(handleTap()) {
      decreaseHealth();
    }
  
    switchToNextAnimation();
    setTimeout(() => {
      switchToNextAnimation();
    }, animations[animationType].length * 150);
  };

  useEffect(() => {
    if (isPlaying) {
      return playAnimation(animations[animationType], animationType === 'celebrate' || animationType === 'idle');
    }
  }, [isPlaying, animationType]);

  useEffect(() => {
    if (playDead && animationType !== 'dead') {
      setAnimationType('dead');
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    } else if (playDead && animationType === 'dead') {
      setFrameIndex(deadFrames.length - 1);
      setIsPlaying(false);
    }
  }, [playDead]);

  useEffect(() => {
    if (playCelebrate && animationType !== 'celebrate') {
      setAnimationType('celebrate');
    } 
  }, [playCelebrate]);

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