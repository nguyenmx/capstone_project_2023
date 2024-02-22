import React, { useState, useContext} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image, route } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'; // Import InputToolbar
import BackArrow from '../../modules/BackArrow';
import { generateResponse } from '../../components/StoryModeBot';
import profileIcon from '../../images/ChatBotIcons/profileIcon.png';
import stickerIcon from '../../images/ChatBotIcons/stickerIcon.png';
import verify from '../../images/TinderPage/verify.png';



const backgroundImage = require('../../images/Backgrounds/combatModeBackground.png');
const botAvatar = require('../../images/PlayableAnimals/duckRizz.gif');


const TestChatGPT = ({ navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const { currentProfile } = route.params;

  const onSend = async (newMessages = []) => {
    const userInput = newMessages[0].text;
    if (!userInput) return;

    setMessages(previousMessages => [
      ...previousMessages,
      { _id: Math.random().toString(), text: userInput, user: { _id: 1 } },
    ]);

    try {
      // const botResponse = "quackquack";
      const botResponse = await generateResponse(userInput, currentProfile.personality);
      if (botResponse.includes('https')) {
        setMessages(previousMessages => [
          ...previousMessages,
          { _id: Math.random().toString(), image: botResponse, user: { _id: 2, name: 'ChatGPT' } },
        ]);
      }
      else {
          setMessages(previousMessages => [
            ...previousMessages,
            { _id: Math.random().toString(), text: botResponse, user: { _id: 2, name: 'ChatGPT' } },
          ]);
      }
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
          <ImageBackground source={currentProfile.animalType} style={styles.botAvatar} />
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
        <ImageBackground source={currentProfile.animalType} style={styles.botNavAvatar} />
        <Text style={styles.animalName}>{currentProfile.name}</Text>
        <Text style={styles.animalName}>{", " + currentProfile.age}</Text>
        {currentProfile.verified && <Image source={verify} style={styles.verifiedIcon} />}
        <ImageBackground source={profileIcon} style={styles.profileIcon} />
      </View>
    );
  };

  // Custom InputToolbar component
  const renderInputToolbar = props => {
    return (
      <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainer}
      primaryStyle={styles.inputToolbarPrimary}
      placeholder="Type a message..."
    >
    </InputToolbar>
    );
  };
  
  const CustomBottomNavBar = () => {
    return (
      <View style={styles.bottomNavContainer}>
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
          renderInputToolbar={renderInputToolbar} // Render custom InputToolbar
        />
      </ImageBackground>
      {/* <CustomBottomNavBar /> */}
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
    fontSize: 28,
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
    left: 335,
    top: 55,
    position: 'absolute',
  },
  inputToolbarContainer: {
    padding: 8

  
  },
  inputToolbarPrimary: {
    backgroundColor: 'rgb(255,227, 249)',
    borderRadius: 25, // Set border radius
    paddingHorizontal: 10, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
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