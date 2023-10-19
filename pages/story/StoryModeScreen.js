import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const StoryModeScreen = () => {
  const { name, setName } = useContext(ReferenceDataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Story Mode Screen XD</Text>
      <Text style={styles.content}>Welcome back {name}</Text>
      {/* Add your content for the Story Mode screen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
  },
});

export default StoryModeScreen;

