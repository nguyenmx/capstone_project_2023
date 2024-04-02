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

export const TapProvider = ({ children }) => {
  const [tapCount, setTapCount] = useState(0);
  const tapThreshold = 15;
  const swipeTimeout = useRef(null);

  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [showHandImage, setShowHandImage] = useState(false);

  const window = Dimensions.get('window');
  const windowDimensions = useWindowDimensions();
  const isLandscape = windowDimensions.width > windowDimensions.height;
  const duckWidth = window.width * 0.58;
  const duckHeight = window.height * 0.58;

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
      console.log('Duck tapped!');
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
    //console.log("Current coordinates: ", gestureState.moveX, gestureState.moveY);
    clearTimeout(swipeTimeout.current);

    swipeTimeout.current = setTimeout(() => {
      setShowHandImage(false);
    }, 200);

    // Define the coordinates of the triangle
    const x1 = 220, y1 = 424; // Top point
    const x2 = 150, y2 = 569; // Left point
    const x3 = 280, y3 = 569; // Right point
  
    const isInsideTriangle = isPointInsideTriangle(gestureState.moveX, gestureState.moveY, x1, y1, x2, y2, x3, y3);

    
    if (isInsideTriangle) {
      //console.log('Point is inside the triangle');
      //Need additional logic - maybe check if they have stayed within the triangle under the threshold
      return true;
    } 
    else {
      //console.log('Point is outside the triangle');
      return false;
    }

  };

  function computeTriangleArea(x1, y1, x2, y2, x3, y3) {
    // Calculate the area of the triangle using the formula: 0.5 * |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|
    return 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
}

function isPointInsideTriangle(x, y, x1, y1, x2, y2, x3, y3) {
    // Calculate the areas of the three sub-triangles formed by the point and the edges of the triangle
    const areaTotal = computeTriangleArea(x1, y1, x2, y2, x3, y3);
    const area1 = computeTriangleArea(x, y, x2, y2, x3, y3);
    const area2 = computeTriangleArea(x1, y1, x, y, x3, y3);
    const area3 = computeTriangleArea(x1, y1, x2, y2, x, y);

  
    return area1 + area2 + area3 === areaTotal;
}

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
            left: handPosition.x - 40,
            top: handPosition.y - 40,
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