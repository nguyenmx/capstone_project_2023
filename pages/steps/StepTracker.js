import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity  } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


 

const StepTracker = () => {


  const backgroundImage = require('../../images/clouds.png');
  const { steps, setSteps } = useContext(ReferenceDataContext);


    // State and refs to manage time and stopwatch status 
  const [time, setTime] = useState(0); 
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
  // Function to resume the stopwatch 
  const resumeStopwatch = () => { 
      startTimeRef.current = Date.now() - time * 1000; 
      intervalRef.current = setInterval(() => { 
          setTime(Math.floor( 
              (Date.now() - startTimeRef.current) / 1000)); 
      }, 1000); 
      setRunning(true); 
  }


  const save_steps = async() => {
    try {
      await AsyncStorage.setItem("NumberOfSteps", steps);
    } 
    catch (err) {
      alert("I need a number! quaack");
    }
  }

  const save = () => {
    if (save_steps()){
      startStopwatch();
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

  const handleStepsChange = (newStepNumber) => {
    setSteps(newStepNumber);
  }
  
  const change = () => {
    save_steps()
    
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
        <Button onPress={change} title="Edit" style={styles.button} />
        <Button onPress={remove} title="Erase" style={styles.button} />


        <Text>You number is: {steps}</Text>

        </View>
        
        <View style={styles.container_1}> 
          <Text style={styles.timeText}>{time}s</Text> 
          <View style={styles.buttonContainer}> 
              {running ? ( 
                  <TouchableOpacity 
                      style={[styles.button_1, styles.pauseButton]} 
                      onPress={pauseStopwatch} 
                  > 
                      <Text style={styles.buttonText}>Pause</Text> 
                  </TouchableOpacity> 
              ) : ( 
                  <> 
                      <TouchableOpacity 
                          style={[styles.button, styles.startButton]} 
                          onPress={startStopwatch} 
                      > 
                          <Text style={styles.buttonText}>Start</Text> 
                      </TouchableOpacity> 
                      <TouchableOpacity 
                          style={[styles.button, styles.resetButton]} 
                          onPress={resetStopwatch} 
                      > 
                          <Text style={styles.buttonText}> 
                              Reset 
                          </Text> 
                      </TouchableOpacity> 
                  </> 
              )} 
              {!running && ( 
                  <TouchableOpacity 
                      style={[styles.button, styles.resumeButton]} 
                      onPress={resumeStopwatch} 
                  > 
                      <Text style={styles.buttonText}> 
                          Resume 
                      </Text> 
                  </TouchableOpacity> 
              )} 
          </View> 
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
    },
    container_1: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    header_1: { 
        fontSize: 30, 
        color: "green", 
        marginBottom: 10, 
    }, 
    subHeader: { 
        fontSize: 18, 
        marginBottom: 10, 
        color: "blue", 
    }, 
    timeText: { 
        fontSize: 48, 
    }, 
    buttonContainer: { 
        flexDirection: 'row', 
        marginTop: 20, 
    }, 
    button_1: { 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5, 
    }, 
    startButton: { 
        backgroundColor: '#2ecc71', 
        marginRight: 10, 
    }, 
    resetButton: { 
        backgroundColor: '#e74c3c', 
        marginRight: 10, 
    }, 
    pauseButton: { 
        backgroundColor: '#f39c12', 
    }, 
    resumeButton: { 
        backgroundColor: '#3498db', 
    }, 
    buttonText: { 
        color: 'white', 
        fontSize: 16, 
    }, 
}); 


  

export default StepTracker;