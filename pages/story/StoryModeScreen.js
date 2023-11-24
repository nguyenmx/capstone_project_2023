import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const StoryModeScreen = ({navigation}) => {
  const { name, setName } = useContext(ReferenceDataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Story Mode Screen XD</Text>
      <Text style={styles.content}>Welcome back {name}</Text>
      <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TestChatGPT')}>
          <Text style={styles.buttonText}>ChatBot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TinderSwipePage')}>
          <Text style={styles.buttonText}>TinderSwipePage</Text>
        </TouchableOpacity>

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

