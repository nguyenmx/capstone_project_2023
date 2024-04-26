import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const withCurrency = (WrappedComponent) => {
  return (props) => {
    const currencyContext = useCurrency();
    return <WrappedComponent {...props} currency={currencyContext} />;
  };
};

export const CurrencyProvider = ({ children }) => {
  const [coins, setCoins] = useState(50); // start with 50 coins
  const [diamonds, setDiamonds] = useState(5); // start with 5 diamonds
  const [inventoryItems, setInventoryItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Load coins and diamonds from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCurrencyFromStorage = async () => {
      const storedCoins = await AsyncStorage.getItem('coins');
      const storedDiamonds = await AsyncStorage.getItem('diamonds');

      if (storedCoins !== null) {
        setCoins(parseInt(storedCoins));
      }

      if (storedDiamonds !== null) {
        setDiamonds(parseInt(storedDiamonds));
      }
    };
    loadCurrencyFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('coins', coins.toString());
    AsyncStorage.setItem('diamonds', diamonds.toString());
  }, [coins, diamonds]);


  const earnCurrency = (type) => {
    const MAX_COINS = 999;
    const MAX_DIAMONDS = 999;

    if (type === 'coins') {
      setCoins((prevCoins) => Math.min(prevCoins + 50, MAX_COINS));
    } else if (type === 'diamonds') {
      setDiamonds((prevDiamonds) => Math.min(prevDiamonds + 50, MAX_DIAMONDS));
    }
  };

  const earnCurrency2 = (type, amount) => {
    const MAX_COINS = 999;
    const MAX_DIAMONDS = 999;

    if (type === 'coins') {
      setCoins((prevCoins) => Math.min(prevCoins + amount, MAX_COINS));
    } else if (type === 'diamonds') {
      setDiamonds((prevDiamonds) => Math.min(prevDiamonds + amount, MAX_DIAMONDS));
    }
  };

  const handleAllItemsPurchased = (allItems) => {
    const purchasedItems = allItems.filter(item => item.purchased);
    setPurchasedItems(purchasedItems); // Directly updating the state in the context
    console.log("Heeeeeeereeeee2222222")
  };
  

  const spendCurrency = (type, price) => {
    if (type === 'coins') {
      setCoins((prevCoins) => Math.max(prevCoins - price, 0)); // Deduct price from coins
    } else if (type === 'diamonds') {
      setDiamonds((prevDiamonds) => Math.max(prevDiamonds - price, 0)); // Deduct price from diamonds
    }
  };

  const addItemToInventory = (item) => {
    setInventoryItems([...inventoryItems, item]);
  };

  const removeItemFromInventory = (item) => {
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
    <CurrencyContext.Provider
      value={{
        coins,
        diamonds,
        earnCurrency,
        earnCurrency2,
        spendCurrency,
        inventoryItems,
        addItemToInventory,
        removeItemFromInventory,
        purchasedItems, 
        handleAllItemsPurchased,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
