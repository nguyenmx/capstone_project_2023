import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StopClock from './Stopclock';
import timer from './timer';

const StepTracker = () => {

  timer();


    const backgroundImage = require('../../images/clouds.png');
    const { steps, setSteps } = useContext(ReferenceDataContext);
    const save = async() => {
      try {
        await AsyncStorage.setItem("NumberOfSteps", steps)
      } 
      catch (err) {
        alert("I need a number! quaack");
      }
    }

    const load = async () => {
      try {
        let steps = await AsyncStorage.getItem("NumberOfSteps")
  
        if (steps != "") {
          setSteps(steps);
        }
      }
      catch (err) {
        alert(err);
      }
    }

    useEffect(() => {
      load();
    }, []);

    const remove = async () => {
      try {
        await AsyncStorage.removeItem("NumberOfSteps")
      }
      catch (err) {
        alert(err);
      } finally {
        setSteps("");
      }
    }

    const handleStepsChange = (newStepNumber) => {
      setSteps(newStepNumber);
    }
  


  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>

        <Text style={styles.text}>EnTeR yOuR nUmBeR of sTePs you wAlKeD tOdAy  😁 </Text>
        <TextInput
          style={styles.input}
          value={steps}
          
          onChangeText={handleStepsChange}
        />
        <Button onPress={save} title="Submit" style={styles.button} />
        <Button onPress={remove} title="Erase" style={styles.button} />

        <Text>You number is: {steps}</Text>

        </View>
        

        <View style={styles.container}>
          <StopClock/>
        </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      marginTop: 10
    },
    text: {
      fontSize: 33,
      color: "darkblue",
      margin: 15,
      textAlign: 'center',
      marginBottom: 30,
      fontFamily: 'NiceTango-K7XYo'
    },
    input: {
      width: 150,
      height: 50,
      borderColor: '#70c2e5',
      borderRadius: 20,
      borderWidth: 4,
      marginBottom: 10,
      paddingHorizontal: 10,
      fontSize: 22,
      backgroundColor: 'white',
      textAlign: "center"
    },
    button: {
      backgroundColor: 'pink',
      color: 'white'
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  

export default StepTracker;