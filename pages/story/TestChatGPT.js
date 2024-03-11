import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../../modules/BackArrow';
import { generateResponse } from '../../components/StoryModeBot';
import profileIcon from '../../images/ChatBotIcons/profileIcon.png';
import stickerIcon from '../../images/ChatBotIcons/stickerIcon.png';
import eraserIcon from '../../images/ChatBotIcons/eraserIcon.png';
import verify from '../../images/TinderPage/verify.png';

const backgroundImage = require('../../images/Backgrounds/combatModeBackground.png');
const botAvatar = require('../../images/PlayableAnimals/duckRizz.gif');

const TestChatGPT = ({ navigation, route }) => {
  const { currentProfile } = route.params;
  const characterId = currentProfile.id;

  const [messages, setMessages] = useState([]);

  const storeMessages = async (messages, characterId) => {
    try {
      await AsyncStorage.setItem(`chatMessages_${characterId}`, JSON.stringify(messages));
    } catch (error) {
      console.error('Error storing messages:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem(`chatMessages_${characterId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [characterId]);

  const clearChat = () => {
    setMessages([]);
    storeMessages([], characterId); // Save an empty array to clear messages
    console.log("cleared");
  };

  const onSend = async (newMessages = []) => {
    const userInput = newMessages[0].text;
    if (!userInput) return;
  
    if (userInput.toUpperCase() === 'CLEAR CHAT') {
      clearChat();
      return;
    }
  
    const userMessage = {
      _id: Math.random().toString(),
      text: userInput,
      user: { _id: 1 },
    };
  
    const updatedMessages = [...messages, userMessage];
  
    setMessages(updatedMessages);
    storeMessages(updatedMessages, characterId);
  
    try {
      const botResponse = await generateResponse(
        userInput,
        currentProfile.personality,
        currentProfile.name,
        currentProfile.age
      );
  
      const newBotMessage = {
        _id: Math.random().toString(),
        [botResponse.includes('https') ? 'image' : 'text']: botResponse,
        user: { _id: 2, name: 'ChatGPT' },
      };
  
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      storeMessages([...updatedMessages, newBotMessage], characterId);
    } catch (error) {
      console.error('Error fetching bot response:', error);
  
      // Log additional details if available
      if (error.response) {
        console.error('Axios response data:', error.response.data);
      }
  
      // Handle the error appropriately, e.g., display a user-friendly message in the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { _id: Math.random().toString(), text: 'Error generating response', user: { _id: 2, name: 'ChatGPT' } },
      ]);
    }
  };
  
  
  
    const renderBubble = (props) => {
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
  
    const renderAvatar = (props) => {
      if (props.currentMessage.user._id === 2) {
        return (
          <View style={styles.botAvatarContainer}>
            <ImageBackground source={currentProfile.animalType} style={styles.botAvatar} />
          </View>
        );
      }
      return null;
    };
  
    const CustomNavBar = () => {
      return (
        <View style={styles.topNavContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <ImageBackground source={currentProfile.animalType} style={styles.botNavAvatar} />
          <Text style={styles.animalName}>{currentProfile.name}</Text>
          <Text style={styles.animalName}>{`, ${currentProfile.age}`}</Text>
          {currentProfile.verified && <Image source={verify} style={styles.verifiedIcon} />}
          <ImageBackground source={profileIcon} style={styles.profileIcon} />
          <TouchableWithoutFeedback onPress={clearChat}>
            <Image source={eraserIcon} style={styles.eraseIcon} />
          </TouchableWithoutFeedback>
        </View>
      );
    };
  
    const renderInputToolbar = (props) => {
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainer}
          primaryStyle={styles.inputToolbarPrimary}
          placeholder="Type a message..."
        />
      );
    };
  
    return (
      <View style={styles.backgroundContainer}>
        <CustomNavBar />
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{ _id: 1 }}
            renderBubble={renderBubble}
            renderAvatar={renderAvatar}
            inverted={false}
            renderInputToolbar={renderInputToolbar}
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
    top: 45,
    fontSize: 25,
    left: 5,
  },
  topNavContainer: {
    padding: 11,
    flexDirection: 'row',
  },
  backButton: {
    top: 38,
  },
  botNavAvatar: {
    width: 80,
    height: 80,
    top: 15,
  },
  profileIcon: {
    width: 31,
    height: 38,
    left: 300,
    top: 55,
    position: 'absolute',
  },
  eraseIcon: {
    width: 33,
    height: 41,
    left: 360,
    top: 55,
    position: 'absolute',
    pointerEvents: 'box-only', // Add this line
  },
  inputToolbarContainer: {
    padding: 5,
  },
  inputToolbarPrimary: {
    backgroundColor: 'rgb(255,230, 255)',
    borderRadius: 25, // Set border radius
    paddingHorizontal: 8, // Add horizontal padding
    paddingVertical: 8, // Add vertical padding
  },
  verifiedIcon: {
    width: 30,
    height: 30,
    top: 45,
    left: 12
  }
  // bottomNavContainer: {
  //   padding: 20
  // }
});

export default TestChatGPT;