import React, { useContext, useEffect, useState, useRef, navigation } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity, Image, Dimensions  } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import buddies from '../../images/CapyAndDuck.gif';
import cancel from '../../images/cancel.png';
import submit from '../../images/submitButton.png';
import BackArrow from '../../modules/BackArrow';

const window = Dimensions.get('window');
 

const StepTracker = ({navigation}) => {


  const backgroundImage = require('../../images/clouds.png');
  const { steps, setSteps } = useContext(ReferenceDataContext);


    // State and refs to manage time and stopwatch status 
  const [time, setTime] = useState(86400); 
  const [running, setRunning] = useState(false); 
  const intervalRef = useRef(null); 
  const startTimeRef = useRef(0); 
  // Function to start the stopwatch 
  const startStopwatch = () => { 
      startTimeRef.current = Date.now() + time * 1000; 
      intervalRef.current = setInterval(() => { 
          const remainingTime = Math.floor((startTimeRef.current - Date.now()) / 1000);
          setTime(remainingTime); 
          if (remainingTime <= 0){
            clearInterval(intervalRef.current);
            setRunning(false);
            setTime(86400);
            setSteps("");
          }
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
      setTime(86400); 
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

          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <BackArrow style={styles.backArrowContainer}> </BackArrow>
            </TouchableOpacity>
            <Text style={styles.text}>I've waddled.. </Text>
          </View>

          <Image source={buddies} style={styles.buddies}></Image>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} 
            value={steps} 
            onChangeText={handleStepsChange}
            placeholder="type.."
            placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={remove}>
            <Image source={cancel} style={styles.cancelButton} />
          </TouchableOpacity>
          </View>

          <Text style = {styles.stepsText}> STEPS </Text>
            {/* <Button onPress={save} title="Submit" style={styles.button} /> */}
          <TouchableOpacity onPress={save}>
          <Image source={submit} style={styles.submitButton} />
          </TouchableOpacity>
            {/* <Button onPress={remove} title="Erase" style={styles.button} /> */}
         <Text style={styles.stepsDescription}>Your steps will reset in.. </Text>
          
          <View style={styles.timeContainer}> 
            <Text style={styles.timeText}>{String(Math.floor((time / 3600) % 24)).padStart(2, '0')} : </Text>
            <Text style={styles.timeText}>{String(Math.floor((time / 60) % 60)).padStart(2, '0')} : </Text> 
            <Text style={styles.timeText}>{String(time % 60).padStart(2, '0')} </Text> 
          </View>

          <TouchableOpacity onPress={remove_two}>
          <Text style={styles.emergencyText}>Emergency Stop for Stopwatch 😬</Text>
          </TouchableOpacity> 
        </View>   
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      marginTop: 60
    },
    text: {
      fontSize: 48,
      color: "darkblue",
      textAlign: 'center',
      fontFamily: 'NiceTango-K7XYo'
    },
    cancelButton: {
      position: 'absolute',
      top: 11,
      width: 55,
      height: 55
    },
    submitButton: {
      width: 110,
      height: 110
    },
    stepsDescription: {
      marginTop: 20,
      fontSize: 20,
      color: "darkblue",
      textAlign: 'center',
      fontFamily: 'NiceTango-K7XYo',
    },
    stepsText: {
      fontSize: 65,
      color: "darkblue",
      margin: 0,
      textAlign: 'center',
      fontFamily: 'NiceTango-K7XYo'
    },
    input: {
      width: 250,
      height: 80,
      borderColor: '#70c2e5',
      borderRadius: 20,
      borderWidth: 4,
      paddingHorizontal: 10,
      fontSize: 50,
      backgroundColor: 'white',
      textAlign: "center"
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emergencyText: {
      color: 'red',
      fontFamily: 'NiceTango-K7XYo',
      fontSize: 12
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    timeContainer: { 
        flex: 0.7, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    timeText: { 
        fontSize: 50, 
    }, 
    buddies: {
      width: 250,
      height: 250
    }
}); 


  

export default StepTracker;