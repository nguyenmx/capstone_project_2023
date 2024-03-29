import React, { createContext, useContext, useState } from 'react';

const TapContext = createContext();

export const useTap = () => useContext(TapContext);

export const withTap = (WrappedComponent) => {
  return (props) => {
    const tapContext = useTap();
    return <WrappedComponent {...props} tapHandler={tapContext} />;
  };
};

export const TapProvider = ({children}) => {
  const [lastTapTime, setLastTapTime] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const tapThreshold = 8; // Define the threshold for number of taps
  const tapInterval = 1000; // Define the interval in milliseconds within which taps will be counted

  const handleTap = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < tapInterval) {
      setTapCount(prevCount => prevCount + 1);
    } else {
      setTapCount(1);
    }

    // Update the last tap time
    setLastTapTime(currentTime);

    if (tapCount >= tapThreshold) {
      console.log('You are tapping too much on the pet!');
      // Call any additional methods here, e.g., decreaseHealth();
      setTapCount(0);
      return true;
      //decreaseHealth();
    } else {
      console.log('Duck tapped!');
      return false;
    }
  };

  return (
    <TapContext.Provider value={{ handleTap }}>
      {children}
    </TapContext.Provider>
  );
};