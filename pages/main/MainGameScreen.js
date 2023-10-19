import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReferenceDataContext } from "../ReferenceDataContext";
import Animal from '../../components/Animal'
import confusedDuck from '../../images/confusedDuck.gif';


const MainGameScreen = () => {
  const backgroundImage = require('../../images/clouds.png');
  const { name, setName } = useContext(ReferenceDataContext);
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
    setName(newName);
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>what's my name? :\</Text>
        <Image source={confusedDuck} style={styles.duck} />
        
        <TextInput
          style={styles.input}
          placeholder="Enter your pet's name here"
          value={name}
          onChangeText={handleNameChange}
        />
        <Button onPress={save} title="Save me!" style={styles.button} />
        <Button onPress={remove} title="Delete me!" style={styles.button} />
      </View>
      </ImageBackground>
    );
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 33,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 22,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#841584',
    color: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});


export default MainGameScreen;