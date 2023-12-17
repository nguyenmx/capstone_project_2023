// PetHouseLandscape.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenOrientation } from 'expo';

const PetHouseLandscape = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Lock the screen to landscape when the component mounts
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Unlock the screen when the component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  // Add your landscape-specific components and logic here

  return (
    <View style={styles.container}>
      <Text>Landscape Version of PetHouse</Text>
      {/* Add your landscape-specific components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PetHouseLandscape;

