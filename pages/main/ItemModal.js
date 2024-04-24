import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import closeIcon from '../../images/PetHouse/close.png';


const ItemModal = ({ visible, item, itemID, onClose }) => {
  let title = '';
  let description = '';
  if (itemID === 1) {
    title = 'Apple';
    description = 'Doctors fear me the most...';

  }  else if (itemID === 2) {
    title = 'Bread';
    description = 'It\'s like a breadstick, but bigger and loafier—because why settle for less?';

  }  else if (itemID === 3) {
    title = 'Cake';
    description = 'That\'s one thick piece of cake';

  }  else if (itemID === 4) {
    title = '2% Milk';
    description = 'Life is short, milk it';

  }  else if (itemID === 5) {
    title = 'Steak';
    description = 'love is in the air, \n and it\'s medium rare';

  }  else if (itemID === 6) {
    title = 'Can Tuna';
    description = 'You CAN tuna fish';

  }  else if (itemID === 7) {
    title = 'Boba';
    description = 'It\'s bobalicious!';

  }  else if (itemID === 8) {
    title = 'Shrimp';
    description = 'As shrimple as that. Be one in a krillion.';

  }  else if (itemID === 9) {
    title = 'Mango';
    description = 'A fruit that\'s so good, it\'ll make you question all your life choices';

  }  else if (itemID === 10) {
    title = 'Salad';
    description = 'Lettuce harmonizes with the crisp notes of cucumber, creating a refreshing melody on your palate';

  }  else if (itemID === 11) {
    title = 'Burger';
    description = 'The best burgers come from the best cows';

  }  else if (itemID === 12) {
    title = 'Coffee';
    description = 'Hello darkness, my old friend';
  }
  else if (itemID === 13) {
    title = '???';
    description = '???';
  }
  else if (itemID === 14) {
    title = 'Pal potion';
    description = 'Unlock 1 Friendship Heart instantly';
  }  else if (itemID === 15) {
    title = 'Full Heal';
    description = 'Regain full health for your pet';
  }  else if (itemID === 16) {
    title = 'Heal';
    description = 'Regain a portion of health for your pet';
  }


  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image source={item} style={styles.modalImage} />
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
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
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
