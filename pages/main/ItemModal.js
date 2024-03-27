// Define a mapping for item images
import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import closeIcon from '../../images/PetHouse/close.png';
import mango from '../../images/Food/Mango.png';
import boba from '../../images/Food/Bobba_Green.png';
import salad from '../../images/Food/Salat.png';
import burger from '../../images/Food/Burger.png';
import shrimp from '../../images/Food/Shrimp.png';
import lemonade from '../../images/Food/Drink_Lemonade.png';

const itemImages = {
    72: lemonade,
    70: burger,
    71: shrimp,
    68: boba,
    69: salad,
    137: require('../../images/Food/Bread.png'),
    140: require('../../images/Food/Beef_Grilled.png'),
    141: require('../../images/Food/CannedFood_Fish.png'),
  };
  
  const ItemModal = ({ visible, item, onClose }) => {
    let title = '';
    let description = '';
    let imageSource = itemImages[item] || null; // Default to null if item ID not found
  
    if (item === 72) {
      title = 'Lemonade';
      description = 'Lemony Fresh :)';
    } else if (item === 70) {
      title = 'Burger';
      description = 'The best burgers come from the best cows';
    } else if (item === 71) { 
      title = 'Shrimp';
      description = 'As shrimple as that';
    }
    else if (item === 68) { 
      title = 'Matcha Boba';
      description = 'Matcha Boba';
    }
    else if (item === 69) {
      title = 'Salad';
      description = 'Lettuce harmonizes with the crisp notes of cucumber, creating a refreshing melody on your palate';
    } 
    else if (item === 137) { 
      title = 'Bread';
      description = 'It\'s like a breadstick, but bigger and loafier—because why settle for less?';
    }
    else if (item === 140) { 
      title = 'Steak';
      description = 'love is in the air              —and it\'s medium rare';
    }
    else if (item === 141) { 
      title = 'Can O\' Fish';
      description = 'smells...fishy';
    }

    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            {imageSource && <Image source={imageSource} style={styles.modalImage} />}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFE7B8',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      borderColor: '#663A31',
      borderWidth: 10,
      width: 290,
      height: 400,
      position: 'relative', // Necessary for positioning close button
    },
    modalImage: {
      width: 125,
      height: 125,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 999,
    },
    closeIcon: {
      width: 55,
      height: 55,
      left: 35,
      top: -30,
    },
    title: {
      fontFamily: 'NiceTango-K7XYo',
      fontSize: 35,
      marginTop: 10,
    },
    description: {
      fontFamily: 'NiceTango-K7XYo',
      fontSize: 22,
      textAlign: 'center',
      marginTop: 10,
    },
  });
  
  export default ItemModal;