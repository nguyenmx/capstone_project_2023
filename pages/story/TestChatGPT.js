import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import { generateResponse } from '../../components/StoryModeBot';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import BackArrow from '../../modules/BackArrow';


const backgroundImage = require('../../images/Backgrounds/combatModeBackground.png');
const botAvatar = require('../../images/PlayableAnimals/duckRizz.gif');

const TestChatGPT = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages = []) => {
    const userInput = newMessages[0].text;
    if (!userInput) return;

    setMessages(previousMessages => [
      ...previousMessages,
      { _id: Math.random().toString(), text: userInput, user: { _id: 1 } },
    ]);

    try {
      //  const botResponse = await generateResponse(userInput);
      const botResponse = "quackquack"; // Simulated bot response

      setMessages(previousMessages => [
        ...previousMessages,
        { _id: Math.random().toString(), text: botResponse, user: { _id: 2, name: 'ChatGPT' } },
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'lightpink',
            borderRadius: 18,
            padding: 5,
          },
          left: {
            backgroundColor: 'white',
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

  const renderAvatar = props => {
    if (props.currentMessage.user._id == 2) {
      return (
        <View style={styles.botAvatarContainer}>
          <ImageBackground source={botAvatar} style={styles.botAvatar} />
        </View>
      );
    }
    return null;
  };

  const CustomNavBar = () => {
    return (
      <View style={styles.topNavContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()} // Use navigation.goBack() to go back
            >
              <BackArrow />
            </TouchableOpacity>
        <ImageBackground source={botAvatar} style={styles.botAvatar} />
        <Text style={styles.animalName}>Name</Text>
      </View>
    );
  };

  return (
    <View style={styles.backgroundContainer}>
       <CustomNavBar />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{ _id: 1 }}
          renderBubble={renderBubble}
          renderAvatar={renderAvatar} // Custom avatar rendering
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
  botAvatarContainer: {
    marginRight: 5,
  },
  botAvatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  animalName: {
    top: 40,
    fontSize: 25,
  },
  topNavContainer: {
    padding: 15,
    flexDirection: 'row'
  },
  backButton: {
    top: 38
  }
});

export default TestChatGPT;
