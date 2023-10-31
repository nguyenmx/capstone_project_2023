import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const StepTracker = () => {
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
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

export default StepTracker;