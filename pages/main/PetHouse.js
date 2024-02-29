import React, { useState, useEffect, useContext, useRef} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, Button, Modal, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
// import settingButton from '../../images/settingButton.png';
import MainGameLogic from '../../components/MainGameLogic';
import HealthBar from '../../modules/HealthBar';
import petFood from '../../images/petFood.png';
import profileIcon from '../../images/PetHouse/Portrait/ProfileButton.png';
import medicineIcon from '../../images/PetHouse/Portrait/medicineIcon.png';
import foodIcon from '../../images/PetHouse/Portrait/foodIcon.png';
import itemShop from '../../images/ItemShop/shopPic.png';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import { useNavigation } from '@react-navigation/native'; 
//import UseOrientation from '../../components/UseOrientation';
import { useWindowDimensions } from 'react-native';
import Inventory from './Inventory';
import Currency from './Currency';
import light from '../../images/LightS.png';
import LottieView from 'lottie-react-native';

import tasks from '../../components/main_game_logic/suggested_tasks';

const window = Dimensions.get('window');

const PetHouse = () => {
  const { name, setName, playerHealth} = useContext(ReferenceDataContext);
  const { selectedDuck } = useContext(ReferenceDataContext);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [health, setHealth] = useState(100);
  const maxHealth = 100;
  const [isNight, setIsNight] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const playerHealthRef = useRef(null);


  const toggleDayNight = () => {
    setIsNight(!isNight);
  };

  const backgroundImageSource = isNight 
    ? require('../../images/Backgrounds/livingRoom_night.jpg') 
    : require('../../images/Backgrounds/livingRoom.jpg');


  const windowDimensions = useWindowDimensions();

  const decreaseHealth = () => {
    const newHealth = Math.max(0, health - 10);
    setHealth(newHealth);
  };

  const increaseHealth = () => {
    const newHealth = Math.min(maxHealth, health + 10);
    setHealth(newHealth);
  };

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/music/Main_bgm.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    sound.playAsync({ isLooping: true });
    sound.setVolumeAsync(volume);
  }

  const navigation = useNavigation(); // Initialize the navigation hook


  useEffect(() => {

    playerHealthRef.current.setMaxHealth(playerHealth);

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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateToShop = () => {
    navigation.navigate('Shop');
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfilePage');
  };

  const onItemDrop = (item) => {
    if (item === null) {
      removeItemFromInventory(item);
      increaseHealth();
    } else {
      console.log("item dropped on nothing: " + item)
    }
  };
  

  const isLandscape = windowDimensions.width > windowDimensions.height;


  //custom styles start here -- should put these in their own class
  const duckPosition = {
    left: isLandscape ? 10 : 10,
    top: isLandscape ? -140 : 80,
  };

  const lightPosition = {
    right: isLandscape ? 293 : 75,
    top: isLandscape ? 2 : 220,
    transform: [{ scale: .15 }],
    position: 'absolute'
  };

  const topNavContainer = {
    position: 'relative',
    flexDirection: 'row',
    left: isLandscape ? -240 : window.width * -0.05,
    marginTop: isLandscape ? 100 : 100,
    top: isLandscape ? -20 : 10
  };

  const bottomNavContainer = {
    flexDirection: 'row',
    marginBottom: isLandscape ? -80 : -100,
    marginTop: isLandscape ? -240: 160,
    top: 10
  };

  const currencyContainer = {
      width: isLandscape ? '19%' :'26%',
      height: isLandscape ? '33%' :'32%',
      borderWidth: 2, 
      borderColor: 'rgba(160, 200, 220, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(184, 240, 260, 1)',
      borderRadius: 20,
      shadowOffset: { width: 4, height: 4 },
      shadowColor: 'rgba(117, 82, 103, 0.8)',
      shadowOpacity: 1,
      opacity: 0 // added in  opacity to make invisable without changing the positioning
  };

  const healthPosition = {
    top: isLandscape ? -85 : window.height * -0.06, 
    left: isLandscape ? -250 : window.width * -0.08
  };

  const diamondAndCoinContainer = {
    flexDirection: 'row',
    top: isLandscape ? -230 : 0,
    right: isLandscape ? -400 : 0
  };

  const itemShopImg = {
    top: isLandscape ? -2 : -33,
    left: isLandscape ? 150: 0
   };

   const backgroundImage = {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: isLandscape ? -80 : -70
  };

  const dialogueContainer = {
      width: '100%',
      top: isLandscape ? window.width * 0.02 : 14,
      height: isLandscape ? '14%' : '10.8%', 
      borderWidth: 7, 
      borderColor: 'rgba(77, 49, 45, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(143, 151, 74, 0.7)',
      borderRadius: 8,
      shadowOffset: { width: 4, height: 4 },
      shadowColor: 'rgba(102, 58, 49, 0.8)',
      shadowOpacity: 1,
  }


  function getRandomInt_forTasks(max) {
    return Math.floor(Math.random() * (max - 0) + 0);
  }

  console.log("Random number is: ", getRandomInt_forTasks(6));
  console.log("Task is: ", tasks);

  //const orientation = UseOrientation();
  //console.log(orientation)

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style = {topNavContainer}>

          <TouchableOpacity onPress={navigateToProfile} style={styles.shopButton}>
            <View style = {styles.profileContainer}>
              <Image source={profileIcon} style ={styles.profileIcon}></Image> 
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
              </View>
            </View>
            </TouchableOpacity>
      
            <Inventory foodIcon={foodIcon} styles={styles} onItemDrop={onItemDrop} />


          <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={medicineIcon} style ={styles.navItem}></Image>
          </TouchableOpacity>

        </View>

        <HealthBar
            ref={playerHealthRef}
            Optional={healthPosition}
            health={health}
            maxHealth={maxHealth}
            decreaseHealth={decreaseHealth}
            increaseHealth={increaseHealth}
            currentHealthProp={playerHealth}
        />

        <Duck duckType={selectedDuck} Optional={duckPosition} />
        
        <TouchableOpacity onPress={toggleDayNight} style={lightPosition}>
          <Image source={light} style={position = 'absolute'}/>
        </TouchableOpacity>
 
          <View style={bottomNavContainer}>
    
              <View style={diamondAndCoinContainer}>
                <Currency></Currency>
                <Image source={diamond}></Image>

                <View style={currencyContainer}>
                  <Text style={styles.currencyText}>1.2K</Text>
                </View>

                <Image source={coin}></Image>

                <View style={currencyContainer}>
                  <Text style={styles.currencyText}>812</Text>
                </View>   

              </View>

            <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={itemShop} style={itemShopImg}></Image>
            </TouchableOpacity>
          </View>

          <View style={dialogueContainer}>
            <Text style={styles.dialogueText}>Current Task: {tasks[getRandomInt_forTasks(tasks.length)]} </Text>
         </View>

        
        {/* <HealthBar
          Optional={styles.healthPosition}
          health={health}
          maxHealth={maxHealth}
          decreaseHealth={decreaseHealth}
          increaseHealth={increaseHealth}
        />

        <HealthBar
          Optional={styles.healthPosition}
          health={health}
          maxHealth={maxHealth}
          decreaseHealth={decreaseHealth}
          increaseHealth={increaseHealth}
          heartIconSource={petFood}
          healthBarColor="blue"
        />

        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Living room
        </Animated.Text>

       

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
              <Button title="Play Sound" onPress={playSound} />
            </View>
          </View>
        </Modal>

        <Duck duckType={selectedDuck} Optional={styles.duckCoffeeImage} />

        <TouchableOpacity onPress={toggleModal}>
          <Image source={settingButton} style={styles.settingButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
          <Image source={shop} style={styles.shopIcon} />
        </TouchableOpacity>

        <MainGameLogic /> */}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: -70
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: -70
  },
  nameContainer: {
    width: 175,
    height: 60, 
    borderWidth: 4, 
    borderColor: 'rgba(160, 200, 220, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(184, 240, 260, 1)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(117, 82, 103, 0.8)',
    shadowOpacity: 1,
  },
  // currencyContainer: {
  //   width: '25%',
  //   height: '32%', 
  //   borderWidth: 8, 
  //   borderColor: 'rgba(160, 200, 220, 0.9)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(184, 240, 260, 1)',
  //   borderRadius: 18,
  //   shadowOffset: { width: 4, height: 4 },
  //   shadowColor: 'rgba(117, 82, 103, 0.8)',
  //   shadowOpacity: 1,
  // },
  currencyText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 35,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bottomNavContainer: {
    flexDirection: 'row',
    marginBottom: -100,
    marginTop: 175
  },
  //This needs to be modified as a static component to correct the layout when the screen is flipped
  //   topNavContainer: {
  //   flexDirection: 'row',
  //   left: window.width * -0.05,
  //   marginTop: 65,
  // },
  nameText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 32,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex:999
  },
  profileIcon: {
    width: 90,
    height: 90,
    top: -10,
    left: 40,
    zIndex: 2
  },
  profileContainer: {
    flexDirection: 'row',
    left: -10
  },
  navItem: {
    width: 65,
    height: 65
  },
  dialogueContainer: {
    width: '100%',
    height: '12.5%', 
    borderWidth: 7, 
    borderColor: 'rgba(77, 49, 45, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(143, 151, 74, 0.7)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(102, 58, 49, 0.8)',
    shadowOpacity: 1,
  },
  dialogueText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 23,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  title: {
    fontSize: window.width * 0.09,
    top: -130,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
  },



  // settingButtonImage: {
  //   position: 'absolute',
  //   left: window.width * 0.3,
  //   top: window.height * -0.78,
  //   width: 75,
  //   height: 75,
  //   zIndex: 999,
  // },

  // settingsText: {
  //   fontSize: 50,
  //   fontFamily: 'NiceTango-K7XYo',
  //   color: 'black',
  // },
  // popUp: {
  //   backgroundColor: 'pink',
  //   marginTop: 80,
  //   margin: 50,
  //   padding: 40,
  //   borderRadius: 10,
  //   flex: 0.80,
  // },
  // shopButton: {
  //   position: 'absolute',
  //   bottom: 20, // Adjust the position as needed
  //   right: 20, // Adjust the position as needed
  //   zIndex: 999,
  // },
  // shopIcon: {
  //   width: 50,
  //   height: 50,
  //   // Adjust the size and styles as needed
  // },
});



export default PetHouse;

