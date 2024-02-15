//CurrencyContext.js
import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const withCurrency = (WrappedComponent) => {
  return (props) => {
    const currencyContext = useCurrency();
    return <WrappedComponent {...props} currency={currencyContext} />;
  };
};

export const CurrencyProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);

  const earnCurrency = (type) => {
    if (type === 'coins') {
      setCoins((prevCoins) => Math.min(prevCoins + 50, MAX_COINS));
    } else if (type === 'diamonds') {
      setDiamonds((prevDiamonds) => Math.min(prevDiamonds + 50, MAX_DIAMONDS));
    }
  }

  const spendCurrency = (type, price) => {
    if (type === 'coins') {
      setCoins((prevCoins) => Math.max(prevCoins - price, 0)); // Deduct price from coins
    } else if (type === 'diamonds') {
      setDiamonds((prevDiamonds) => Math.max(prevDiamonds - price, 0)); // Deduct price from diamonds
    }
  };

  const addItemToInventory = (item) => {
    setInventoryItems([...inventoryItems, item]);
    console.log(inventoryItems);
  };

  const removeItemFromInventory = (item) => {
    console.log("Removing item:", item); 
    const indexToRemove = inventoryItems.findIndex((inventoryItem) => inventoryItem === item);
    if (indexToRemove !== -1) {
      const updatedInventory = [...inventoryItems];
      updatedInventory.splice(indexToRemove, 1);
      setInventoryItems(updatedInventory);
    }
  };
  
  
  const MAX_COINS = 999;
  const MAX_DIAMONDS = 999;

  return (
    <CurrencyContext.Provider value={{ coins, diamonds, earnCurrency, spendCurrency,inventoryItems, addItemToInventory, removeItemFromInventory }}>
      {children}
    </CurrencyContext.Provider>
  );
};
