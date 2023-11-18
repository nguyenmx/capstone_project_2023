import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReferenceDataContext } from "../ReferenceDataContext";
import { useNavigation } from '@react-navigation/native';
import confusedDuck from '../../images/confusedDuck.gif';

const window = Dimensions.get('window');
const MainGameScreen = () => {
  const backgroundImage = require('../../images/clouds.png');
  const { name, setName } = useContext(ReferenceDataContext);
  const navigation = useNavigation(); // Get the navigation object
  const MAX_NAME_LENGTH = 20; // Set your desired character limit

  //sets "PetName" as a key then saves name inside it
  const save = async() => {
    try {
      await AsyncStorage.setItem("PetName", name)
    } 
    catch (err) {
      alert("I need a name! quaack");
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
    if (newName.length <= MAX_NAME_LENGTH) {
      setName(newName);
    }
  }

  const navigateToNewScreen = () => {
    navigation.navigate('MG');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding" // or behavior="position"
      >
        <Text style={styles.text}>what's my name? :\</Text>
        <Image source={confusedDuck} style={styles.duck} />

        <TextInput
          style={styles.input}
          placeholder="Enter your pet's name here"
          value={name}
          onChangeText={handleNameChange}
          maxLength={MAX_NAME_LENGTH} // Set the character limit
        />
        <Text style={styles.text}> {name.length}/{MAX_NAME_LENGTH}</Text>
        <Button onPress={save} title="Save me!" style={styles.button} />
        <Button onPress={remove} title="Delete me!" style={styles.button} />
        
      

        <TouchableOpacity style={styles.button} onPress={navigateToNewScreen}>
              <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
            
        

      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default MainGameScreen;

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -55
  },
  text: {
    color: 'darkblue',
    fontSize: 35,
    marginBottom: 5,
    fontFamily: 'NiceTango-K7XYo'
  },
  duck: {
    width: window.width,
    height: window.width
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#70c2e5',
    borderRadius: 15,
    borderWidth: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 22,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#e9f1ff',
    top: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 5, 
    borderColor: 'white',
  },
  buttonText: {
    color: '#91adfa',
    fontFamily: 'NiceTango-K7XYo',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
