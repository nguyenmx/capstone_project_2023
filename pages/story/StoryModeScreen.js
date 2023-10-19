// StoryModeScreen.js
import {React, useContext} from 'react';
import { View, Text } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";


const StoryModeScreen = () => {
  const { name, setName } = useContext(ReferenceDataContext);
    return (
    <View>
      <Text>Story Mode Screen XD</Text>
      {
        /* Add your content for the Story Mode screen */
        <Text>hey {name} </Text>
      }
    </View>
  );
};

export default StoryModeScreen;
