import React, { useState } from 'react';
import Shop from './Shop';
import Inventory from './Inventory';

const InventoryState = () => {
  const [inventory, setInventory] = useState([]);

  const addToInventory = (item) => {
    // Add the imageSource to the inventory
    setInventory([...inventory, item]);
    console.log("here too");
  };

  return (
    <>
      <Shop addToInventory={addToInventory} /> 
      <Inventory inventory={inventory} />
    </>
  );
};

export default InventoryState;
