import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Dimensions, PanResponder } from 'react-native';
import { useTap } from '../components/main_game_logic/TapContext';
import { useCurrency } from '../components/CurrencyContext';
import { ReferenceDataContext } from '../components/ReferenceDataContext';

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
  const { handleTap, handleSwipe } = useTap();
  

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
  
  const {earnCurrency} = useCurrency();
  const [panningDuration, setPanningDuration] = useState(0);
  const {isPettingLongEnough, setIsPettingLongEnough} = useContext(ReferenceDataContext);
  const [isInteraction, setInteraction] = useState(false);
  // Timer reference
  const timerRef = useRef(null);

  

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      console.log("PanResponder granted");
      // Start the timer when panning begins
      // Call sprite animation method - animates and checks player's taps
      setInteraction(true);
      timerRef.current = setInterval(() => {
        setPanningDuration(prevDuration => prevDuration + 1000);
      }, 1000);
    },

    onPanResponderRelease: () => {
      console.log("PanResponder released");
      handleSpritePress();
      // Stop the timer and reset duration when panning ends
      setInteraction(false);
      clearInterval(timerRef.current);
      setPanningDuration(0);
      
      if (panningDuration >= 4000) {
        console.log("You have played with the pet for 5 seconds.");
        setIsPettingLongEnough(true);
        earnCurrency('diamonds');
        console.log(isPettingLongEnough);
      }

    },
    onPanResponderTerminate: () => {
      console.log("PanResponder terminated");
      // Stop the timer and reset duration if the responder is terminated abruptly
      clearInterval(timerRef.current);
      setPanningDuration(0);
    },

    onPanResponderMove: (event, gestureState) => {
      handleSwipe(gestureState);
    },
  });


  useEffect(() => {
    console.log("Panning duration:", panningDuration / 1000);
  }, [panningDuration]);

  return (
    <View style={styles.container}>
        <Image
          {...panResponder.panHandlers}
          source={animations[animationType][frameIndex]}
          style={styles.sprite} 
        />
         {isInteraction && (
        <Image
          source={require('../images/cartoon-thought_fight.png')}
          style={{
            position: 'absolute',
            top: -60, 
            left: 155,
            width: 140, 
            height: 120,
          }}
        />
      )}
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