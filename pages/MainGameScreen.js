import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const MainGameScreen = () => {
  const { name, setName } = useContext(ReferenceDataContext);
  return (
    <View>
      <Text>Main Game Screen :p</Text>
      <TextInput
        placeholder="Enter your pet's name here"
        value={name} // Use the 'name' variable, not 'message'
        onChangeText={(newName) => setName(newName)}
      />
    </View>
  );
};

export default MainGameScreen;