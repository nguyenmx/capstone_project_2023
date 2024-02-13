import React, { createContext, useState, useContext } from 'react';

const ReferenceDataContext = createContext({
  name: "",
  setName: () => {},
  steps: "",
  setSteps: () => {},
  selectedDuck: 0,  // Add selectedDuck to the context
  setSelectedDuck: () => {},  // Add a function to set selectedDuck
  time: "",
  setTime: () => {},
  
});


const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState("0");
  const [time, setTime] = useState("0");
  const [steps, setSteps] = useState("");
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
        time,
        setTime,
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
  