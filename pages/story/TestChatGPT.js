import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet,  ImageBackground} from 'react-native';
import { generateResponse } from '../../components/StoryModeBot';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';

const backgroundImage = require('../../images/Backgrounds/combatModeBackground.png');

const TestChatGPT = () => {
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages = []) => {
    const userInput = newMessages[0].text;
    if (!userInput) return;

    setMessages((previousMessages) => [
      ...previousMessages,
      { _id: Math.random().toString(), text: userInput, user: { _id: 1 } },
    ]);

    try {
      const botResponse = await generateResponse(userInput); // Hardcoded the response for now
      //const botResponse = "quackquack";

      setMessages((previousMessages) => [
        ...previousMessages,
        { _id: Math.random().toString(), text: botResponse, user: { _id: 2, name: 'ChatGPT' } },
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FFA500',
            borderRadius: 18,
            padding: 5,
          },
          left: {
            backgroundColor: '#66CCCC',
            borderRadius: 18,
            padding: 5,
          },
        }}
        textStyle={{
          right: {
            color: 'black',
            fontSize: 20,

          },
          left: {
            color: 'black',
            fontSize: 20,
          },
        }}
      />
    );
  };

  return (
    
    <View style={styles.backgroundContainer}>
    <ImageBackground
    source={backgroundImage}
    style={styles.backgroundImage}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        inverted={false}
      />
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default TestChatGPT;
