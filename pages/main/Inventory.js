import React, { useState, useContext } from 'react';
import { TouchableOpacity, Modal, View, Text, Image, PanResponder, Animated } from 'react-native';
import { withCurrency, useCurrency } from '../../components/CurrencyContext';

const Inventory = ({ foodIcon, styles }) => {
  const { inventoryItems } = useCurrency();

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
                  <DraggableItem key={index} image={item} />
                );
              })}
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

export default withCurrency(Inventory);
