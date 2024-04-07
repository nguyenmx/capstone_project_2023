import React, { useState, useEffect, useContext, useRef} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Image, Dimensions, Button, Modal, Animated, PanResponder, TouchableWithoutFeedback, TouchableNativeFeedbackComponent} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import HealthBar from '../../modules/HealthBar';
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
import ani from '../../images/Animation1.gif'
import birdprof from '../../images/PetHouse/Asset12.png'
import p1 from '../../images/PetHouse/Asset2.png'
import p2 from '../../images/PetHouse/Asset4.png'
import p3 from '../../images/PetHouse/Asset7.png'
import p4 from '../../images/PetHouse/Asset8.png'
import p5 from '../../images/PetHouse/Asset11.png'
import p6 from '../../images/PetHouse/Asset13.png'
import {useTasks} from '../../components/main_game_logic/TasksContext';
import FriendshipLevel from '../../components/main_game_logic/FriendshipLevel';
import { useTap } from '../../components/main_game_logic/TapContext';
import { TapProvider } from '../../components/main_game_logic/TapContext';
// import { TouchableWithoutFeedback } from 'react-native-web';
import zzz from '../../images/PetHouse/zzz.gif'


const window = Dimensions.get('window');

const PetHouse = () => {
  const { name, setName, playerHealth, setPlayerHealth} = useContext(ReferenceDataContext);
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
  const [isVisible, setIsVisible] = useState(true);
  const { tasks, completeTask } = useTasks(); // Access tasks and completeTask function from context
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // Initialize the current task index
  const { handleTap, handleSwipe } = useTap();

  const profileImages = {
    0: p3,//wave
    1: p1, //Capy
    2: p6, //Rizz
    3: p5, //Coffe
    4: p2, // Banana
    5: birdprof, //crow
    6: p4, //Squid
  };

  const profileImagePath = profileImages[selectedDuck];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); 

    return () => {
      clearTimeout(timer);
    };
  }, []); 

  const toggleDayNight = () => {
    setIsNight(!isNight);
  };

  const backgroundImageSource = isNight 
    ? require('../../images/Backgrounds/livingRoom_night.jpg') 
    : require('../../images/Backgrounds/livingRoom.jpg');


  const windowDimensions = useWindowDimensions();

  const healthBarRef = useRef(null);

  const decreaseHealth = () => {
    if (healthBarRef.current) {
      healthBarRef.current.decreaseHealth();
    }
  };

  const decreaseHealthBy = (amount) => {
    if (healthBarRef.current) {
      healthBarRef.current.decreaseHealth_2(amount);
    }
  };

  const increaseHealth = () => {
    if (healthBarRef.current) {
      healthBarRef.current.increaseHealth();
      setPlayerHealth(playerHealth + 5);
    }
  };

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/music/Main_bgm.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    sound.playAsync({ isLooping: false });
    sound.setVolumeAsync(volume);
  }

  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    // Set playerHealthRef to the current HealthBar instance
    playerHealthRef.current = healthBarRef.current;

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
  };

  const zzzPostion = {
    position: 'absolute', 
    zIndex: 997, 
    bottom: 255, 
    left: 69, 
    transform: [{ scale: .5 }]
  };


  useEffect(() => {
    // Set up an effect to move to the next task when the current one is completed
    if (currentTaskIndex !== null && tasks[currentTaskIndex].completed) {
      // Find the index of the next incomplete task
      const nextIncompleteTaskIndex = tasks.findIndex(task => !task.completed);
  
      // Move to the next incomplete task index if found
      if (nextIncompleteTaskIndex !== -1) {
        setCurrentTaskIndex(nextIncompleteTaskIndex);
      }
    }
  }, [currentTaskIndex, tasks]);
  
  const handleCompleteTask = () => {
    // Function to mark the current task as completed
    if (currentTaskIndex !== null) {
      completeTask(currentTaskIndex); // Mark the current task as completed
    }
  };

  

  const handleDuckTap = () => {
    if (handleTap()) {
      decreaseHealth();
    }
    
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        //console.log('hello');
        handleSwipe(gestureState); // Pass the gesture state to handleSwipe
        // if (handleSwipe(gestureState) === 1) {
        //   console.log('duck has been petted.');
        //   increaseHealth();
        // }
      },
      // Add other necessary PanResponder handlers
    })
  ).current;

  // play main bgm
  useEffect(() => {
    playSound(); 
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <TapProvider>
      <View style={styles.container}{...panResponder.panHandlers}>
        <View style = {topNavContainer}>

          <TouchableWithoutFeedback onPress={navigateToProfile} style={styles.shopButton}>
            <View style = {styles.profileContainer}>
            <Image source={profileImagePath} style={styles.profileIcon} />
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
      
            <Inventory 
              foodIcon={foodIcon} 
              onItemDrop={() => console.log("item dropped")} 
              onItemDropBy={(amount) => console.log("debug")} 
              onItemFeed={() => increaseHealth()} 
            />

          <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={medicineIcon} style ={styles.navItem}></Image>
          </TouchableOpacity>

        </View>


         <HealthBar Optional={healthPosition} ref={healthBarRef} currentHealthProp={playerHealth} />

         {isVisible && (<Image source={ani}  style= {{position: 'absolute', zIndex: 999}}/>)} 
         
         {isNight && (
          <Image source={zzz} style={{ position: 'absolute', zIndex: 997, bottom: isLandscape ? 40 : 290 , left: isLandscape ? 250 :20, transform: [{ scale: .5 }] }} />
        // <Image source={zzz} style={zzzPostion}> </Image>
        )}
         {/* <View style = {styles.test}{...panResponder.panHandlers}> */}
          <TouchableOpacity onPress={handleDuckTap}>
            <View>
            <Duck 
            duckType={selectedDuck} 
            Optional={duckPosition} 
            decreaseHealth = {decreaseHealth}
            //onCircularMotion={panResponder.panHandlers}
            />
            </View>
          </TouchableOpacity>
        {/* </View> */}

        <TouchableOpacity onPress={toggleDayNight} style={lightPosition}>
          <Image source={light} style={{position:'relative'}}/>
        </TouchableOpacity>
 
          <View style={bottomNavContainer}>
    
              <View style={diamondAndCoinContainer}>
                <Currency></Currency>
                <Image source={diamond} style= {{opacity: 0}}></Image>

                <View style={currencyContainer}>
                  <Text style={styles.currencyText}>1.2K</Text>
                </View>

                <Image source={coin} style= {{opacity: 0}}></Image>

                <View style={currencyContainer}>
                  <Text style={styles.currencyText}>812</Text>
                </View>   
              </View>

            <TouchableOpacity onPress={navigateToShop} style={styles.shopButton}>
            <Image source={itemShop} style={itemShopImg}></Image>
            </TouchableOpacity>
          </View>

          <View style={dialogueContainer}>
            <Text style={styles.dialogueText}>Current Task: {tasks[currentTaskIndex].text} </Text>
         </View>

      </View>
      </TapProvider>
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
  nameContainer: {
    width: 175,
    height: 60, 
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
    left: 15,
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
    zIndex: 999,
    textAlign: 'center'
  }
});

export default PetHouse;
