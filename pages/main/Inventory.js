// Inventory.js
import React, { useState } from 'react';
import { TouchableOpacity, TouchableHighlight, Modal, View, Text, Button, Image, PanResponder, Animated } from 'react-native';
import Bread from '../../images/Food/Bread.png';
import LN from '../../images/Food/Drink_Lemonade.png'
import Cake from '../../images/Food/CakeSlice_Regular.png'

const Inventory = ({ foodIcon, styles }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

    // Function to add item to inventory
    const addItemToInventory = (item) => {
      setInventory([...inventory, item]);
    };
  
    // Render inventory items
    const renderInventoryItems = () => {
      return inventory.map((item, index) => (
        <Image key={index} source={item.imageSource} style={{ width: 55, height: 55, marginBottom: 3 }} />
      ));
    };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.shopButton}>
        <Image source={foodIcon} style={styles.navItem} />
      </TouchableOpacity>

<Modal transparent={true} visible={modalVisible} animationType='fade'>
  <TouchableOpacity
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={(event) => {
      const isInsideModal = event.target === event.currentTarget;
      if (isInsideModal) { console.log("ok")
      closeModal();

      } else {
        // Close the modal if tapped outside
        console.log("nah")
      }
    }}
  >
    <View style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 3, borderColor: 'lightblue', width: '88%', marginTop: -305 }}>
      {/* Header Section */}
      <View style={{ backgroundColor: 'lightblue', padding: 3, borderTopLeftRadius: 3, borderTopRightRadius: 3 }}>
        <Text style={{ fontSize: 20, fontFamily: 'NiceTango-K7XYo', color: 'white',  textAlign: 'center' }}>meals</Text>
      </View>

      {/* Content Section */}
      <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      <DraggableItem image={Bread} />
      <DraggableItem image={LN} />
      <DraggableItem image={LN} />
      <DraggableItem image={Bread} />
      <DraggableItem image={Cake} />
      <DraggableItem image={Cake} />


      </View>
    </View>
  </TouchableOpacity>
</Modal>


    </>
  );
};

const DraggableItem = ({ image }) => {
  const [pan] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y
        }
      ],
      { useNativeDriver: false } // Add this options object
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    }
  });
  

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={image}
      style={[{ width: 55, height: 55, marginBottom: 3 }, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
    />
  );
};

export default Inventory;