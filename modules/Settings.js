import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, Text, Button } from 'react-native';
import settingButton from '../images/settingButton.png';
import Slider from '@react-native-community/slider';

const Settings = ({ Optional: playSound }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onVolumeChange = (value) => {
    setVolume(value);
    // You can add additional logic here if needed
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={settingButton} style={styles.settingButtonImage} />
      </TouchableOpacity>
      <Modal 
          transparent={true}
          visible={modalVisible}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
              <Button title="Play Sound" onPress={playSound} />
              </View>
              </View>

        </Modal>
    </>
  );
};

const styles = {
  settingButtonImage: {
    width: 70,
    height: 70,
    position: 'absolute',
    left: 115,
    // Add any other styles as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(231, 216, 255, 1)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'rgba(33, 4, 81, 1)',
    elevation: 5, 
    alignItems: 'center',
    width: 300, 
    height: 300,
  },
  settingsText: {
    fontSize: 20,
    marginBottom: 10,
    // Add any other styles as needed
  },
};

export default Settings;
