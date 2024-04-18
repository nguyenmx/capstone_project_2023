import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Modal, View, Text, Image, PanResponder, Animated, Dimensions } from 'react-native';
import { useCurrency } from '../../components/CurrencyContext';
import { useTasks } from '../../components/main_game_logic/TasksContext';


const window = Dimensions.get('window');

const Inventory = ({ foodIcon, inventoryPos, Optional: styles, onItemDrop, onItemDropBy, onItemFeed }) => {
  const { inventoryItems, removeItemFromInventory } = useCurrency();
  const { completeTask, showModel } = useTasks();

  const [modalVisible, setModalVisible] = React.useState(false);

  // console.log("showModel:", showModel);
  // console.log("inventoryItems:", inventoryItems);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRemoveItem = (item) => {
    removeItemFromInventory(item);
    onItemDrop(); // Call the passed function for dropping items
  };

  const handleRemoveItemBy = (item, amount) => {
    removeItemFromInventory(item);
    onItemDropBy(amount); // Call the passed function for dropping items by custom amount
  };

  const handleFeedDuck = () => {
    onItemFeed(); // Call the passed function for feeding the duck
    completeTask(0); //Mark the first task as complete
    //Mark which task has been complete
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={{width: 50, height: 50}}>
        <Image source={foodIcon} style={{width: 65, height: 65, zIndex: 997}}/>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible && !showModel} animationType='fade'>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={(event) => {
            const isInsideModal = event.target === event.currentTarget;
            if (isInsideModal) {
              closeModal();
            }
             else {
              // Close the modal if tapped outside
            }
          }}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'orange', borderWidth: 1, width: '88%', marginTop: -305 }}>
            {/* Header Section */}
            <View style={{ backgroundColor: 'orange', padding: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Text style={{ fontSize: 20, fontFamily: 'NiceTango-K7XYo', color: 'rgba(254, 252, 229, 1)', textAlign: 'center', letterSpacing: 2 }}>meals</Text>
            </View>

            
            {inventoryItems.length === 0 ? ( // Check if inventory is empty
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NiceTango-K7XYo', color: 'gray', textAlign: 'center' }}>nothing’s here...</Text>
              </View>
            ) : (
              <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'orange', justifyContent: 'space-evenly' }}>
                {inventoryItems.map((item, index) => {
                  return (
                    <DraggableItem
                      key={index}
                      image={item}
                      onDrop={() => handleRemoveItem(item)} 
                      onDropBy={(amount) => handleRemoveItemBy(item, amount)} 
                      onFeed={() => handleFeedDuck()} 
                    />
                  );
                })}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const DraggableItem = ({ image, onDrop, onDropBy, onFeed }) => {
  const [pan] = React.useState(new Animated.ValueXY());
  const [fadeAnim] = React.useState(new Animated.Value(1)); // Initialize opacity value with 1

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
        moveX < window.width / 4.4 + window.width * 0.60 &&
        moveY > window.height / 2.4 &&
        moveY < window.height / 2.1 + window.width * 0.50;

      if (isOverlapping) {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Adjust duration as needed
          useNativeDriver: false
        }).start(() => {
          // After the fade-out animation completes, trigger onDrop and onFeed
          onDrop();
          onFeed();
        });
      } else {
        // If not dropped on the duck, reset the position of the item
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={image}
      style={[
        { width: 55, height: 55, marginBottom: 3, opacity: fadeAnim }, // Apply fade animation to opacity
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
      ]}
    />
  );
};


export default Inventory;
