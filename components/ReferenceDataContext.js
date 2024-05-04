import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReferenceDataContext = createContext({
  name: '',
  setName: () => {},
  steps: '',
  setSteps: () => {},
  selectedDuck: 0,
  setSelectedDuck: () => {},
  time: '',
  setTime: () => {},
  playerHealth: '',
  setPlayerHealth: () => {},
  isPettingLongEnough: false,
  setIsPettingLongEnough: () => {},
  isNight: false, // Default value for isNight
  setIsNight: () => {} // Setter function for isNight
  
});

const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('0');
  const [steps, setSteps] = useState('');
  const [selectedDuck, setSelectedDuck] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [isPettingLongEnough, setIsPettingLongEnough] = useState(false);
  const [mood, setMood] = useState('Happy');
  const [isNight, setIsNight] = useState(false); // State to track day/night


  //Load health from AsyncStorage on component mount
  //Retrieves the player's health after opening the app
  useEffect(() => {
    const loadHealth = async () => {
      try {
        const value = await AsyncStorage.getItem('currentHealth');
        if (value !== null) {
          setPlayerHealth(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading health:', error);
      }
    };

    loadHealth();
  }, []);

  // // Update health in AsyncStorage whenever it changes
  // useEffect(() => {
  //   const saveHealth = async () => {
  //     try {
  //       if (playerHealth !== null) {
  //         await AsyncStorage.setItem('currentHealth', JSON.stringify(playerHealth));
  //       }
  //     } catch (error) {
  //       console.error('Error saving health:', error);
  //     }
  //   };

  //   saveHealth();
  // }, [playerHealth]); // Update health whenever it changes

  // Modify setPlayerHealth to ensure it stays between 0 and 100
  const clampedPlayerHealth = (newHealth) => {
    return Math.min(Math.max(newHealth, 0), 100);
  };

  return (
    <ReferenceDataContext.Provider
      value={{
        name,
        setName,
        steps,
        setSteps,
        selectedDuck,
        setSelectedDuck,
        time,
        setTime,
        playerHealth,
        //setPlayerHealth: (newHealth) => setPlayerHealth(clampedPlayerHealth(newHealth)),
        setPlayerHealth,
        isPettingLongEnough,
        setIsPettingLongEnough,
        mood,
        setMood,
        isNight, // Provide isNight in context
        setIsNight,
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export const useReferenceData = () => useContext(ReferenceDataContext);

export { ReferenceDataContext, ReferenceDataContextProvider };
