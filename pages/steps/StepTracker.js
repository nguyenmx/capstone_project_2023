import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity  } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Duck from '../../modules/CharDuck';


 

const StepTracker = () => {


  const backgroundImage = require('../../images/clouds.png');
  const { steps, setSteps } = useContext(ReferenceDataContext);


    // State and refs to manage time and stopwatch status 
  const [time, setTime] = useState(86399); 
  const [running, setRunning] = useState(false); 
  const intervalRef = useRef(null); 
  const startTimeRef = useRef(0); 
  // Function to start the stopwatch 
  const startStopwatch = () => { 
      startTimeRef.current = Date.now() - time * 1000; 
      intervalRef.current = setInterval(() => { 
          setTime(Math.floor((Date.now() -  
          startTimeRef.current) / 1000)); 
      }, 1000); 
      setRunning(true); 
  }; 
  // Function to pause the stopwatch 
  const pauseStopwatch = () => { 
      clearInterval(intervalRef.current); 
      setRunning(false); 
  }; 
  // Function to reset the stopwatch 
  const resetStopwatch = () => { 
      clearInterval(intervalRef.current); 
      setTime(0); 
      setRunning(false); 
  }; 

  const save_steps = async(steps) => {
    try {
      await AsyncStorage.setItem("NumberOfSteps", steps);
    } 
    catch (err) {
      alert("I need a number! quaack");
      throw err;
    }
  }


  const save = async () => {
    try {
      await save_steps(steps);
      if (parseInt(steps)){
        startStopwatch();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const load = async () => {
    try {
      let steps = await AsyncStorage.getItem("NumberOfSteps")

      if (steps !== null && steps !== "") {
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

  const remove_steps = async () => {
    try {
      await AsyncStorage.removeItem("NumberOfSteps")
    }
    catch (err) {
      alert(err);
    } finally {
      setSteps("");
    }
  }

  const remove = () => {
    if (remove_steps()){
      resetStopwatch();
    }
  }

  const remove_two = () => {
    resetStopwatch();
  }

  const handleStepsChange = (newStepNumber) => {
    if(parseInt(newStepNumber)){
      setSteps(newStepNumber);
    }
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
          <View className = "buttonC">
            <Button onPress={save} title="Submit" style={styles.button} />
            <Button onPress={remove} title="Erase" style={styles.button} />
          </View>


          <Text>Your Dayily steps number is:    {steps}</Text>
          <Duck></Duck>

          <View style={styles.container_1}>
            <Text>Hours     Minutes    Seconds</Text>
          </View>

          <View style={styles.container_1}> 
            <Text style={styles.timeText}>{String(Math.floor((time / 3600) % 24)).padStart(2, '0')} : </Text>
            <Text style={styles.timeText}>{String(Math.floor((time / 60) % 60)).padStart(2, '0')} : </Text> 
            <Text style={styles.timeText}>{String(time % 60).padStart(2, '0')} </Text> 
          </View> 
          <Button onPress={remove_two} title="Emergency Stop for Stopwatch 😬" style={styles.button} />

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
    // button: {
    //   backgroundColor: 'red',
    //   color: 'red',
    //   marginHorizontal: 5,
    // },
    backgroundImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    container_1: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: { 
        fontSize: 48, 
    }, 
    buttonC: {
      flexDirection: 'row', // Arrange children horizontally
      justifyContent: 'space-between', // Space evenly between children
      margin: 17,
    },
    Duck:{
      width: 2
    }
}); 


  

export default StepTracker;