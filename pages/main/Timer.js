import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const Timer = ({ initialTimer = 30 }) => {
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerInterval);
        console.log('Timer has reached 0');
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return <Text>{'Restocking in... ' + minutes + ':' + seconds}</Text>;
};

export default Timer;
