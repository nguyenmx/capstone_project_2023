import React, { createContext, useState, useContext } from 'react';

const ReferenceDataContext = createContext({
  name: "",
  setName: () => {},
  steps: "",
  setSteps: () => {},
});

const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState(undefined);
  const [steps, setSteps] = useState(undefined);

  return (
    <ReferenceDataContext.Provider
      value={{
        name,
        setName,
        steps,
        setSteps
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
  