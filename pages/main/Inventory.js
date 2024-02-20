import React, { useState, useContext } from 'react';
import { TouchableOpacity, Modal, View, Text, Image, PanResponder, Animated, Dimensions } from 'react-native';
import { withCurrency, useCurrency } from '../../components/CurrencyContext';
import Duck from '../../modules/CharDuck';

const window = Dimensions.get('window');


const Inventory = ({ foodIcon, styles, onItemDrop}) => {
  const { inventoryItems, removeItemFromInventory } = useCurrency(); // Get removeItemFromInventory from the currency context
  

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleRemoveItem = (item) => {
    removeItemFromInventory(item); // Call removeItemFromInventory function with the item's ID
    onItemDrop();
    console.log("new list: " + inventoryItems)
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
            if (isInsideModal) {
              closeModal();
            } else {
              // Close the modal if tapped outside
            }
          }}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'orange',borderWidth: 1,  width: '88%', marginTop: -305 }}>
            {/* Header Section */}
            <View style={{ backgroundColor: 'orange', padding: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Text style={{ fontSize: 20, fontFamily: 'NiceTango-K7XYo', color: 'rgba(254, 252, 229, 1)', textAlign: 'center', letterSpacing: 2 }}>meals</Text>
            </View>

            {/* Content Section */}
            <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 4, borderColor: 'orange',  justifyContent: 'space-evenly' }}>
            
            {inventoryItems.map((item, index) => {
              return (
                <DraggableItem key={index} image={item} onDrop={handleRemoveItem} />
                );
            })}

            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const DraggableItem = ({ image, onDrop }) => {
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
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (event, gesture) => {
      const { moveX, moveY } = gesture;

      // Check if the item is dropped on top of the Duck
      const isOverlapping =
      moveX > window.width / -4.1 &&
      moveX < window.width / 4.5+ window.width * 0.58 &&
      moveY > window.height / 2.5 &&
      moveY < window.height / 2.1 + window.width * 0.58;

      if (isOverlapping) {
        // Call onDrop function to remove the item from inventory
        onDrop(image); // Assuming image is the item being dropped
      }

      // Reset the position of the item after release
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
      style={[
        { width: 55, height: 55, marginBottom: 3 },
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
      ]}
    />
  );
};




export default withCurrency(Inventory);
