import React, { createContext, useState } from 'react';

const ReferenceDataContext = createContext({
  name: '',
  setName: () => {},
  steps: '',
  setSteps: () => {},
  selectedDuck: 0,
  setSelectedDuck: () => {},
  time: '',
  setTime: () => {},
  playerHealth: 100,
  setPlayerHealth: () => {},
});

const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [steps, setSteps] = useState('');
  const [selectedDuck, setSelectedDuck] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);

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
        setPlayerHealth: (newHealth) => setPlayerHealth(clampedPlayerHealth(newHealth)),
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
