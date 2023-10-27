import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { generateResponse } from '../../ChatGPTService';


const TestChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    // Logic to send message will go here
    if (!userInput) return;

    setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
    const botResponse = await generateResponse(userInput);
    setMessages(prevMessages => [...prevMessages, `ChatGPT: ${botResponse}`]);
    setUserInput('');
  };

  return (
    <View>
      <ScrollView>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </ScrollView>
      <View>
        <TextInput 
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default TestChatGPT;