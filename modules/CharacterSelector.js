import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ReferenceDataContext } from '../components/ReferenceDataContext';
import { SplashScreen } from 'expo';

const window = Dimensions.get('window');

const CharacterSelector = ({ navigation }) => {

  const { setSelectedDuck } = useContext(ReferenceDataContext);
  const [selectedDuckState, setSelectedDuckState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function getSelectedDuck() {
      try {
        const value = await AsyncStorage.getItem('selectedDuck');
        if (value !== null) {
          saveSelectedDuck(parseInt(value, 10));
        }
      } catch (error) {
        console.error('Error getting selectedDuck from AsyncStorage:', error);
      }
    }
  
    getSelectedDuck();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  function saveSelectedDuck(index) {
    setSelectedDuck(index);
  }

  const petSprites = [
    { name: 'Wave Duck', image: require('../images/PlayableAnimals/duckWave.gif') },
    { name: 'Capybara', image: require('../images/PlayableAnimals/capyKnife.gif') },
    { name: 'Rizz Duck', image: require('../images/PlayableAnimals/duckRizz.gif') },
    { name: 'Coffee Duck', image: require('../images/PlayableAnimals/duckCoffee.gif') },
    { name: 'Banana Duck', image: require('../images/PlayableAnimals/ducky.gif') },
    { name: 'Bird', image: require('../images/PlayableAnimals/simpleBird.gif') },
    { name: 'Squid', image: require('../images/PlayableAnimals/simpleSquid.gif') },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectDuck = (index) => {
    saveSelectedDuck(index);
    setSelectedDuckState(index);
    closeModal();
  };  

  const handleLongPress = () => {
    // Disable long press while modal is open
    if (!modalVisible) {
      openModal();
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.centeredContainer}>
        <TouchableOpacity onLongPress={handleLongPress}>
          <View style={styles.swiperContainer}>
            <Image source={petSprites[selectedDuckState].image} style={styles.petImage} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Character Selector</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContent} indicatorStyle="black">
                {petSprites.map((pet, index) => (
                  <TouchableOpacity key={index} onPress={() => selectDuck(index)}>
                    <View style={styles.modalItem}>
                      <Image source={pet.image} style={styles.modalItemImage} />
                      <Text style={styles.modalItemName}>{pet.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  petName: {
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: window.height * 0.6,
    width: window.width * 0.9,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 70,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalItem: {
    width: '100%', // Adjust width as needed
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 0,
  },
  modalItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  modalItemName: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default CharacterSelector;
