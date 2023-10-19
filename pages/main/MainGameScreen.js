import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReferenceDataContext } from "../ReferenceDataContext";



const MainGameScreen = () => {
  
  const { name, setName } = useContext(ReferenceDataContext);
  //sets "PetName" as a key then saves name inside it
  const save = async() => {
    try {
      await AsyncStorage.setItem("PetName", name)
    } 
    catch (err) {
      alert("you haven't put a name!");
    }
  }
  //Will retrieve the pet's name from Async Storage.
  //Also able to store Objects
  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("PetName")

      if (name != "") {
        setName(name);
      }
    }
    catch (err) {
      alert(err);
    }
  }

  // Will render the pet's name when the page is reloaded
  useEffect(() => {
    load();
  }, []);

  // Removes the PetName key from the Async Storage
  const remove = async () => {
    try {
      await AsyncStorage.removeItem("PetName")
    }
    catch (err) {
      alert(err);
    } finally {
      setName("");
    }
  }

  const handleNameChange = (newName) => {
    setName(newName);
  }

  return (
    <View>
      <Text>Main Game Screen :p</Text>
      <TextInput
        placeholder="Enter your pet's name here"
        value={name}
        onChangeText={handleNameChange}
      />
      <Button
      onPress={save}
      title="Save me!"
      color="#841584"
      />

      <Button
      onPress={remove}
      title="delete me!"
      color="#841584"
      />
    </View>
    
  );
};

export default MainGameScreen;