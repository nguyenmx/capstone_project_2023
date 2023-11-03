import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, Button, Modal, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import duckCoffee from '../../images/duckCoffee.gif';
import settingButton from '../../images/settingButton.png';

const window = Dimensions.get('window');

const PetHouse = () => {

  const [fadeAnim] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

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
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Living room
        </Animated.Text>

        <Image source={duckCoffee} style={styles.duckCoffeeImage} />

        <Button title="Play Sound" onPress={playSound} />

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
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={toggleModal}>
          <Image source={settingButton} style={styles.settingButtonImage} />
        </TouchableOpacity>

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
    width: 200,
    height: 200,
    top: window.height * 0.1,
    left: window.width * -0.05,
  },
  settingButtonImage: {
    position: 'absolute',
    marginLeft: window.width * 0.3,
    marginTop: window.height * -0.63,
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
  }
});

export default PetHouse;
