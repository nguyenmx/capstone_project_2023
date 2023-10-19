import React, { createContext, useState, useContext } from 'react';

const ReferenceDataContext = createContext({
  name: "",
  setName: () => {},
});

const ReferenceDataContextProvider = ({ children }) => {
  const [name, setName] = useState(undefined);

  return (
    <ReferenceDataContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
  