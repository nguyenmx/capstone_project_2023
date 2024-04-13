import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Image, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { useTap } from '../components/main_game_logic/TapContext';
import { useCurrency } from '../components/CurrencyContext';
import { ReferenceDataContext } from '../components/ReferenceDataContext';
import angy from '../images/PetHouse/angy.png';
import HG from '../images/HG.gif'; // Import HG.gif image
import { isNight } from '../pages/main/PetHouse';

const window = Dimensions.get('window');

const SpriteAnimation = ({
  animType,
  idleFrames,
  walkFrames,
  celebrateFrames,
  deadFrames,
  playDead,
  playCelebrate,
  decreaseHealth,
  increaseHealth,
  isNight, // Add isNight prop

}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [animationType, setAnimationType] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const { handleTap, handleSwipe } = useTap();
  const [showAngy, setShowAngy] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false); // State to track celebration
  const [isHGShown, setIsHGShown] = useState(false); // State to track if HG.gif is shown

  const animations = {
    idle: idleFrames,
    walk: walkFrames,
    celebrate: celebrateFrames,
    dead: deadFrames,
  };

  useEffect(() => {
    if (isNight) {
      // If it's night, trigger the celebrate animation
      setAnimationType('celebrate');
      setIsCelebrating(true);
    } else if  (!isNight){
      // If it's not night, play the idle animation
      setAnimationType('idle');
      setIsPlaying(true);
    } else {
      // If it's not night, play the idle animation
      setAnimationType('idle');
      setIsPlaying(true);
    }
  }, [isNight]);
  


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
      const randomAnimation = Math.random(); // Generate a random number between 0 and 1
  
      // Define the probability thresholds for each animation
      const walkThreshold = 0.5; // 50% probability for 'walk'
      const runThreshold = 0.5; // 50% probability for 'run'
  
      // Determine which animation to switch to based on the random number
      let nextAnimation;
      if (randomAnimation < walkThreshold) {
        nextAnimation = 'walk';
      } else if (randomAnimation < runThreshold) {
        nextAnimation = 'celebrate';
      } else {
        nextAnimation = 'idle'; // Fallback to 'idle' animation
      }
  
      setIsPlaying(true); // Start playing the animation
  
      return nextAnimation;
    });
  };
  

  const handleSpritePress = () => {
    if (handleTap()) {
      decreaseHealth();
      setIsDecreased(true);
      setShowAngy(true);
      setTimeout(() => {
        setShowAngy(false);
      }, 300);
    }

    switchToNextAnimation();
    setTimeout(() => {
      switchToNextAnimation();
    }, animations[animationType].length * 150);
  };

  useEffect(() => {
    if (isPlaying) {
      return playAnimation(animations[animationType], animationType === 'celebrate' || animationType === 'idle' || animationType === 'walk');
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
      // Start celebrating
      setIsCelebrating(true);
      // Stop celebrating after 2 seconds
      setTimeout(() => {
        setIsCelebrating(false);
      }, 2000);
    }
  }, [playCelebrate]);

  const { earnCurrency } = useCurrency();
  const [panningDuration, setPanningDuration] = useState(0);
  const { isPettingLongEnough, setIsPettingLongEnough } = useContext(ReferenceDataContext);
  const [isInteraction, setInteraction] = useState(false);
  const timerRef = useRef(null);
  const [isDecreased, setIsDecreased] = useState(false);
  

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      console.log("PanResponder granted");
      timerRef.current = setInterval(() => {
        setPanningDuration(prevDuration => prevDuration + 1000);
      }, 1000);
    },

    onPanResponderRelease: () => {
      console.log("PanResponder released");
      handleSpritePress();
      setInteraction(false);
      clearInterval(timerRef.current);
      setPanningDuration(0);

      if (panningDuration >= 4000) {
        console.log("You have played with the pet for 5 seconds.");
        setIsPettingLongEnough(true);
        increaseHealth();
        console.log(isPettingLongEnough);
      }
    },
    onPanResponderTerminate: () => {
      console.log("PanResponder terminated");
      clearInterval(timerRef.current);
      setPanningDuration(0);
    },

    onPanResponderMove: (event, gestureState) => {
      handleSwipe(gestureState);
    },
  });

  useEffect(() => {
    console.log("Panning duration:", panningDuration / 1000);
    if (panningDuration >= 2000 && !isInteraction) {
      setInteraction(true);
    }
    if (panningDuration >= 4000 && !isCelebrating && !isHGShown) {
      setAnimationType('celebrate');
      setIsCelebrating(true);
      setIsHGShown(true); // Set isHGShown to true to prevent showing HG.gif again
      // Stop celebrating after 2 seconds
      setTimeout(() => {
        setIsCelebrating(false);
        setIsHGShown(false); // Reset isHGShown after 5 seconds
      }, 5000); // Change this to 5000 to show HG for 5 seconds
    }
  }, [panningDuration]);

  return (
    <View style={styles.container}>
      <Image
        {...panResponder.panHandlers}
        source={animations[animationType][frameIndex]}
        style={styles.sprite}
      />
      {/* Display HG.gif when the conditions are met */}
      {isHGShown && (
        <Image
          source={HG}
          style={{
            position: 'absolute',
            bottom: 100,
            right: -60,
            width: 350, // Assuming HG.gif should cover the whole screen
            height: 350,
            zIndex:2000
          }}
        />
      )}
      {/* Render additional images */}
      {isInteraction && (
        <Image
          source={require('../images/cartoon-thought_fight.png')}
          style={{
            position: 'absolute',
            top: -30,
            left: 160,
            width: 130,
            height: 110,
          }}
        />
      )}
      {showAngy && (
        <Image
          source={angy}
          style={{
            position: 'absolute',
            top: 25,
            left: 45,
            width: 70,
            height: 70,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sprite: {
    width: window.width * 0.58,
    height: window.width * 0.58,
    position: 'relative',
  },
});

export default SpriteAnimation;
