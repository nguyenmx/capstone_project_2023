import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Tamagatchi Game </Text>
      <Text>Please choose the mode you want to play</Text>
      <StatusBar style="auto" />
      
      <Button
        title="Pet Mode"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Button
        title="Combat Mode"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Button
        title="Story Mode"
        onPress={() => Alert.alert('Simple Button pressed')}
      />


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// the code to run the program is npx expo run
//git checkout kperfiliev