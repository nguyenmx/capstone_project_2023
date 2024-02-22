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
  playerHealth: 100, // Add playerHealth to the context
  setPlayerHealth: () => {}, // Add a function to set playerHealth
});

const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [steps, setSteps] = useState('');
  const [selectedDuck, setSelectedDuck] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100); // Initialize playerHealth

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
        setPlayerHealth,
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
