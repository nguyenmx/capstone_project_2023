import React, { createContext, useState, useContext } from 'react';

const ReferenceDataContext = createContext({
  name: "",
  setName: () => {},
  steps: "",
  setSteps: () => {},
  selectedDuck: 0,  // Add selectedDuck to the context
  setSelectedDuck: () => {},  // Add a function to set selectedDuck
});


const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState(undefined);
  const [steps, setSteps] = useState(undefined);
  const [selectedDuck, setSelectedDuck] = useState(0);  // Initialize selectedDuck

  return (
    <ReferenceDataContext.Provider
      value={{
        name,
        setName,
        steps,
        setSteps,
        selectedDuck,
        setSelectedDuck,
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
  