import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, Button, Modal, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../ReferenceDataContext';
import settingButton from '../../images/settingButton.png';
import MainGameLogic from '../../components/MainGameLogic';
import HealthBar from '../../modules/HealthBar'; // Adjust the path based on your project structure


const window = Dimensions.get('window');

const PetHouse = () => {

  const { selectedDuck } = useContext(ReferenceDataContext);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [health, setHealth] = useState(100);
  const maxHealth = 100;

  const decreaseHealth = () => {
    const newHealth = Math.max(0, health - 10); // Ensure health doesn't go below 0
    setHealth(newHealth);
  };

  const increaseHealth = () => {
    const newHealth = Math.min(maxHealth, health + 10); // Ensure health doesn't exceed maxHealth
    setHealth(newHealth);
  };


  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/music/Main_bgm.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync({ isLooping: true });
    await sound.setVolumeAsync(volume);
  }

  useEffect(() => {
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    });

    const fadeOutTimeout = setTimeout(() => {
      fadeOut.start();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimeout);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [fadeAnim, sound]);

  const onVolumeChange = (value) => {
    if (sound) {
      sound.setVolumeAsync(value);
    }
    setVolume(value);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground source={require('../../images/livingRoom.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

      <HealthBar
          health={health}
          maxHealth={maxHealth}
          decreaseHealth={decreaseHealth}
          increaseHealth={increaseHealth}
        />



        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Living room
        </Animated.Text>


        <Duck duckType={selectedDuck} Optional={styles.duckCoffeeImage} />

        <Modal
          transparent={true}
          visible={modalVisible}
        >
          <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
            <View style={styles.popUp}>
              <Text style={styles.settingsText}>Settings</Text>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                value={volume}
                onValueChange={onVolumeChange}
              />
              <Button title="Exit" onPress={hideModal} />

              {/* Move the "Play Sound" button into the modal */}
              <Button title="Play Sound" onPress={playSound} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={toggleModal}>
          <Image source={settingButton} style={styles.settingButtonImage} />
        </TouchableOpacity>
        
        <MainGameLogic /> 
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: window.width * 0.09,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
  },
  duckCoffeeImage: {

    bottom: window.height * -0.01,
    left: window.width * -0.05,
    zIndex: 999,
  },
  settingButtonImage: {
    position: 'absolute',
    left: window.width * 0.3,
    top: window.height * -0.63,
    width: 75,
    height: 75,
    zIndex: 999,
  },
  settingsText: {
    fontSize: 50,
    fontFamily: 'NiceTango-K7XYo',
    color: 'black',
  },
  popUp: {
    backgroundColor: 'pink',
    marginTop: 80,
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 0.80,
  },

  healthBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: window.height * -0.2,
    left: window.width * -0.2,
    position: 'relative',
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginRight: 5, // Adjust the margin as needed
  },
  healthBar: {
    height: 90,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 4,
    overflow: 'hidden',
  },
  healthBarInner: {
    backgroundColor: '#ff1a1a',
    height: '100%',
    borderRadius: 3,
  },
  healthText: {
    marginLeft: 5, // Adjust the margin as needed
    fontSize: 16,
    color: 'white',
  },
  healthButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});



export default PetHouse;

