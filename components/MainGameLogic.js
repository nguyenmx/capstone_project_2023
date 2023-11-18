import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainGameLogic = () => {
  
  return (
    <View>

 
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 30, // Adjust the positioning as needed
    zIndex: 1, // Adjust the z-index to control the stacking order
    flexDirection: 'column',
    alignItems: 'center',
  },
  healthText: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default MainGameLogic;
