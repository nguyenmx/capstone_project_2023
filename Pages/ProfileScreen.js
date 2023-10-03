import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert, TextInput} from 'react-native';
import { useState } from "react";

function ProfileScreen({ navigation }) {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <Text>What's your pet's name?</Text>
      <TextInput
        placeholder="enter your pet's name here"
        value={message}
        onChangeText={(text) => setMessage(text)}
        onSubmitEditing={() => alert(`Welcome to ${message}`)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ProfileScreen;
