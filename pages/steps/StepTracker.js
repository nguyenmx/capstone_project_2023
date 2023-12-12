import React, { useContext, useRef, useState, useEffect, navigation } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import buddies from '../../images/CapyAndDuck.gif';
import cancel from '../../images/cancel.png';
import submit from '../../images/submitButton.png';
import BackArrow from '../../modules/BackArrow';

const window = Dimensions.get('window');

const TimerComponent = () => {

  const backgroundImage = require('../../images/clouds.png');
  const { steps, setSteps } = useContext(ReferenceDataContext);

  const { time, setTime } = useContext(ReferenceDataContext);


// these constants are to ensure the timer contunues to run no matter whether the app is running
  const two_four = 40000; //that's 20 seconds
  const [difference, setDifference] = useState(0);
  const [initialTime, setInitialTime] = useState(parseInt(time));
  const [timePassed, setTimePassed] = useState(0);

//these constants are to ensure the timer is displayed
  const [run_time, set_run_Time] = useState(initialTime); 
  const [running, setRunning] = useState(false); 
  const intervalRef = useRef(null); 
  const startTimeRef = useRef(0);

//initiates the timer, records the date to continue to run
  const recordInitialTime = () => {
    if (time=="0" & parseInt(steps)>0){
      setInitialTime(Date.now());
      startStopwatch();
      save_steps();
    }
    
  };

  
  const save_time = async(initilTime) =>{
    try{
      setTime(initilTime)
    } catch{
      alert("Couldn't save time in save_time")
    }
  }

  const save_steps = async(steps) => {
    try {
      await AsyncStorage.setItem("NumberOfSteps", steps);
    } 
    catch (err) {
      alert("I need a number! quaack");
      throw err;
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


  const handleStepsChange = (newStepNumber) => {
    setSteps(newStepNumber);
  }



  const calculateTimePassed = () => {
    if (initialTime) {
      const currentTime = Date.now();
      const elapsed = currentTime - initialTime;
      setTimePassed(elapsed);
      setDifference((two_four - elapsed)/1000); // Use elapsed instead of timePassed
    }
  };

  useEffect(() => {
    save_time(initialTime.toString());
    calculateTimePassed();
    
  }, [initialTime]);


  const restart =()=>{
    setTime("0");
    setInitialTime(0);
    clearInterval(intervalRef.current);
    set_run_Time(86400);
    setRunning(false);
    setSteps("0");
  }


   
  const startStopwatch = () => { 
    startTimeRef.current = Date.now() - parseInt(time); 
    intervalRef.current = setInterval(() => { 
        const remainingTime = Math.floor((startTimeRef.current - Date.now()) / 1000);
        const calc = two_four/1000 + remainingTime;
        set_run_Time(calc); 
        if (calc <= 0){
          restart();
        }
    }, 1000); 
    setRunning(true); 
  }; 

useEffect(()=>{
  if (initialTime != 0){
    startTimeRef.current = parseInt(time); 
    intervalRef.current = setInterval(() => { 
        const remainingTime = Math.floor((startTimeRef.current - Date.now()) / 1000);
        const calc = two_four/1000 + remainingTime;
        set_run_Time(calc);
        if (calc <= 0){
          restart();
        }
    }, 1000); 
    setRunning(true); 
  }
},[])


  



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
          <TouchableOpacity onPress={restart}>
          <Image source={cancel} style={styles.cancelButton} />
        </TouchableOpacity>
        </View>

        <Text style = {styles.stepsText}> STEPS </Text>
          {/* <Button onPress={save} title="Submit" style={styles.button} /> */}
        <TouchableOpacity onPress={recordInitialTime}>
        <Image source={submit} style={styles.submitButton} />
        </TouchableOpacity>
          {/* <Button onPress={remove} title="Erase" style={styles.button} /> */}
       <Text style={styles.stepsDescription}>Your steps will reset in.. </Text>
        
        <View style={styles.timeContainer}> 
          <Text style={styles.timeText}>{String(Math.floor((run_time / 3600) % 24)).padStart(2, '0')} : </Text>
          <Text style={styles.timeText}>{String(Math.floor((run_time / 60) % 60)).padStart(2, '0')} : </Text> 
          <Text style={styles.timeText}>{String(run_time % 60).padStart(2, '0')} </Text> 
        </View>

        <TouchableOpacity onPress={restart}>
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



export default TimerComponent;