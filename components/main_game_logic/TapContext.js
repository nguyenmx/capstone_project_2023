import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PanResponder, Image, TouchableOpacity } from 'react-native';
import hand from '../../images/hand.png';
import { useWindowDimensions, Dimensions } from 'react-native';

const TapContext = createContext();

export const useTap = () => useContext(TapContext);


export const withTap = (WrappedComponent) => {
  return (props) => {
    const tapContext = useTap();
    return <WrappedComponent {...props} tapHandler={tapContext} />;
  };
};

export const TapProvider = ({ children}) => {
  const [tapCount, setTapCount] = useState(0);
  const tapThreshold = 15;
  const swipeTimeout = useRef(null);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [showHandImage, setShowHandImage] = useState(false);


  useEffect(() => {
    if (showHandImage) {
      const timeoutId = setTimeout(() => {
        setShowHandImage(false);
      }, 2000); // Adjust the duration

      return () => clearTimeout(timeoutId);
    }
  }, [showHandImage]);

  const handleTap = () => {
    setTapCount((prevCount) => prevCount + 1);
    if (tapCount >= tapThreshold) {
      console.log('You are tapping too much on the pet!');
      setTapCount(0);
      return true;
    } 
    else {
      setShowHandImage(false);
      //console.log('Duck tapped!');
      return false;
    }
  };
  const handleSwipe = (gestureState) => {
    if (!gestureState) {
      return;
    }
  
    setShowHandImage(true);
  
    // Update hand position
    setHandPosition({ x: gestureState.moveX, y: gestureState.moveY });
    clearTimeout(swipeTimeout.current);
  
    swipeTimeout.current = setTimeout(() => {
      setShowHandImage(false);
    }, 200);
   
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handleSwipe,
      onPanResponderRelease: () => {
      setShowHandImage(false);
      },
    })
  ).current;

  return (
    <TapContext.Provider value={{ handleTap, handleSwipe, panResponder }}>
      {children}
      {showHandImage && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            //increasing the number subtracted will move the cursor to the left
            left: handPosition.x - 58,
            top: handPosition.y,
          }}
          onPress={() => setShowHandImage(false)}
          {...panResponder.panHandlers}
        >
          <Image source={hand} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>
      )}
    </TapContext.Provider>
  );
};