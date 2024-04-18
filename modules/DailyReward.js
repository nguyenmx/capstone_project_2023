import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Doesnt actually give diamonds yet
export const useDailyReward = () => {
  const [lastLogin, setLastLogin] = useState(null);
  const [consecutiveDays, setConsecutiveDays] = useState(0);

  useEffect(() => {
    AsyncStorage.multiGet(['lastLogin', 'consecutiveDays']).then((data) => {
      const lastLoginValue = data[0][1];
      const consecutiveDaysValue = data[1][1];
      
      if (lastLoginValue) {
        setLastLogin(new Date(lastLoginValue));
      }
      
      if (consecutiveDaysValue) {
        setConsecutiveDays(parseInt(consecutiveDaysValue));
      }
    });
  }, []);

  const handleLogin = () => {
    const currentDate = new Date();
    let newConsecutiveDays = consecutiveDays;

    if (!lastLogin || currentDate.getDate() !== lastLogin.getDate()) {
      newConsecutiveDays++;
      
      Alert.alert('Daily Reward', `You have received ${newConsecutiveDays} diamonds for logging in ${newConsecutiveDays} consecutive days!`);

      AsyncStorage.multiSet([
        ['lastLogin', currentDate.toString()],
        ['consecutiveDays', newConsecutiveDays.toString()]
      ]);

      setLastLogin(currentDate);
      setConsecutiveDays(newConsecutiveDays);
    }
  };

  // Test function to make sure daily reward is working
  const simulateNewDay = () => {
    // Manually setting the last login date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    AsyncStorage.setItem('lastLogin', yesterday.toString()).then(() => {
      // Trigger handleLogin to simulate a new day
      handleLogin();
    });
  };

  return { handleLogin, simulateNewDay, consecutiveDays };
};
