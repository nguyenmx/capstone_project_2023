import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { ReferenceDataContext } from "../components/ReferenceDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerComponent = () => {

  const { time, setTime } = useContext(ReferenceDataContext);


// these constants are to ensure the timer contunues to run no matter whether the app is running
  const two_four = 20000; //that's 20 seconds
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
    if (time=="0"){
      setInitialTime(Date.now());
      startStopwatch();
    }
    
  };

  
  const save_time = async(initilTime) =>{
    try{
      setTime(initilTime)
    } catch{
      alert("Couldn't save time in save_time")
    }
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


  



//end of the new code
  return (
    <View>
      <Text></Text><Text></Text><Text></Text><Text></Text>
      <Text>time varaible is: {time}</Text>
      <Button title="Record Initial Time" onPress={recordInitialTime} />
      <Text>Initial Time: {initialTime} seconds</Text>
      <Button title="Record final Time" onPress={calculateTimePassed} />
      <Text>Time Passed: {timePassed/1000} seconds</Text>
      <Text></Text>
      <Text>Time Difference: {difference} seconds</Text>

      <Button title="Remove" onPress={restart} />
      <Text></Text><Text></Text><Text></Text><Text></Text>
      <Text>    timer: {run_time}</Text>

    </View>
  );
};

export default TimerComponent;