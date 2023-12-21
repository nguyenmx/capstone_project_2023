import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, Button, Modal, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
// import settingButton from '../../images/settingButton.png';
import MainGameLogic from '../../components/MainGameLogic';
import HealthBar from '../../modules/HealthBar'; // Adjust the path based on your project structure
import petFood from '../../images/petFood.png';
import profileIcon from '../../images/PetHouse/Portrait/ProfileButton.png';
import medicineIcon from '../../images/PetHouse/Portrait/medicineIcon.png';
import foodIcon from '../../images/PetHouse/Portrait/foodIcon.png';
import itemShop from '../../images/ItemShop/shopPic.png';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
//import UseOrientation from '../../components/UseOrientation';
import { useWindowDimensions } from 'react-native';


const window = Dimensions.get('window');

const PetHouse = () => {
  const { name, setName } = useContext(ReferenceDataContext);
  const { selectedDuck } = useContext(ReferenceDataContext);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [health, setHealth] = useState(100);
  const maxHealth = 100;

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

  const isLandscape = windowDimensions.width > windowDimensions.height;


  //custom styles start here -- should put these in their own class
  const duckPosition = {
    left: isLandscape ? 10 : 10,
    top: isLandscape ? -220 : 80,
    zIndex: 400
  };

  const topNavContainer = {
    flexDirection: isLandscape ? 'column': 'row',
    left: isLandscape ? window.width * -0.35 : window.width * -0.05,
    marginTop: isLandscape ? -130 : 70,
  };

  const bottomNavContainer = {
    flexDirection: 'row',
    marginBottom: isLandscape ? -500 : -100,
    marginTop: isLandscape ? -50: 175
  };

  //const orientation = UseOrientation();

  //console.log(orientation)

  return (
    <ImageBackground source={require('../../images/Backgrounds/livingRoom.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style = {topNavContainer}>

          <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <View style = {styles.profileContainer}>
              <Image source={profileIcon} style ={styles.profileIcon}></Image> 
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
              </View>
            </View>
            </TouchableOpacity>
      
          <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={foodIcon} style ={styles.navItem}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={medicineIcon} style ={styles.navItem}></Image>
          </TouchableOpacity>

        </View>

        <HealthBar
            Optional={styles.healthPosition}
            health={health}
            maxHealth={maxHealth}
            decreaseHealth={decreaseHealth}
            increaseHealth={increaseHealth}
            heartIconSource={petFood}
            healthBarColor="blue"
        />


        <Duck duckType={selectedDuck} Optional={duckPosition} />
        
          <View style={bottomNavContainer}>
    
            <Image source={diamond}></Image>

            <View style={styles.currencyContainer}>
              <Text style={styles.currencyText}>1.2K</Text>
            </View>

            <Image source={coin}></Image>

            <View style={styles.currencyContainer}>
              <Text style={styles.currencyText}>812</Text>
            </View>
            <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={itemShop} style={styles.itemShopImg}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.dialogueContainer}>
            <Text style={styles.dialogueText}>Exceteur sint occaecat cupidatat non proident, sunt in culpa qui</Text>
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
  },
  nameContainer: {
    width: 175,
    height: 60, 
    borderWidth: 8, 
    borderColor: 'rgba(160, 200, 220, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(184, 240, 260, 1)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(117, 82, 103, 0.8)',
    shadowOpacity: 1,
  },
  currencyContainer: {
    width: '25%',
    height: '32%', 
    borderWidth: 8, 
    borderColor: 'rgba(160, 200, 220, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(184, 240, 260, 1)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(117, 82, 103, 0.8)',
    shadowOpacity: 1,
  },
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
    fontSize: 42,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileIcon: {
    top: -10,
    left: 40,
    zIndex: 2
  },
  profileContainer: {
    flexDirection: 'row',
    left: -10
  },
  navItem: {
    width: 70,
    height: 70
  },
  dialogueContainer: {
    width: '100%',
    height: '12.5%', 
    borderWidth: 7, 
    borderColor: 'rgba(77, 49, 45, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(143, 151, 74, 0.9)',
    borderRadius: 18,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'rgba(102, 58, 49, 0.8)',
    shadowOpacity: 1,
  },
  dialogueText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 22,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  itemShopImg: {
   top: -33
  },

  title: {
    fontSize: window.width * 0.09,
    top: -130,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
  },
  // duckChar: {
  //   top: 80,
  //   zIndex: 999,
  // },


  // settingButtonImage: {
  //   position: 'absolute',
  //   left: window.width * 0.3,
  //   top: window.height * -0.78,
  //   width: 75,
  //   height: 75,
  //   zIndex: 999,
  // },
  healthPosition: {
    top: window.height * -0.07, 
    left: window.width * -0.08
  },
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

