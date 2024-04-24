import {React, useContext, useRef, useState, useEffect} from 'react';
import { View, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, PanResponder } from 'react-native';
import SpriteAnimation from './SpriteAnimation';
import { useTap } from '../components/main_game_logic/TapContext';
import { ReferenceDataContext } from '../components/ReferenceDataContext';
import { useCurrency } from '../components/CurrencyContext';
import angy from '../images/PetHouse/angy.png'
import HG from '../images/HG.gif';
import FriendshipLevel from '../components/main_game_logic/FriendshipLevel';
import { useTasks } from '../components/main_game_logic/TasksContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const window = Dimensions.get('window');


export const duckData = {
  0: {
    name: 'Quacky',
    species: 'Duck',
    age: 2,
    favorite_food: require('../images/Food/Bread.png'),
    hate: require('../images/Food/Bobba_Green.png'),
    imageSource: require('../images/PlayableAnimals/duckWave.gif'),
  },
  1: {
    name: 'Stabbo',
    species: 'Capybara',
    age: 1,
    favorite_food: require('../images/Food/Salat.png'),
    hate: require('../images/Food/Coffee.png'),
    imageSource: require('../images/PlayableAnimals/capyKnife.gif'),
  },
  2: {
    name: 'Rizzy',
    species: 'Duck',
    age: 3,
    favorite_food: require('../images/Food/Beef_Grilled.png'),
    hate: require('../images/Food/CannedFood_Fish.png'),
    imageSource: require('../images/PlayableAnimals/duckRizz.gif'),
  },
  3: {
    name: 'Coffee Quacker',
    species: 'Duck',
    age: 4,
    favorite_food: require('../images/Food/Coffee.png'),
    hate: require('../images/Food/Carton_Blue.png'),
    imageSource: require('../images/PlayableAnimals/duckCoffee.gif'),
  },
  4: {
    name: 'Ducky',
    species: 'Duck',
    age: 5,
    favorite_food: require('../images/Food/Bread.png'),
    hate: require('../images/Food/Shrimp.png'),
    imageSource: require('../images/PlayableAnimals/ducky.gif'),
  },
  5: {
    name: 'CrowBro',
    species: 'Crow',
    age: 5,
    favorite_food: require('../images/Food/Burger.png'),
    hate: require('../images/Food/Apple.png'),
    imageSource: require('../images/PlayableAnimals/simpleBird.gif'),
  },
  6: {
    name: 'Squiddy',
    species: 'Squid',
    age: 5,
    favorite_food: require('../images/Food/Shrimp.png'),
    hate: require('../images/Food/Burger.png'),
    imageSource: require('../images/PlayableAnimals/simpleSquid.gif'),
  },
};

export const getSpriteFrames = duckType => {
  if (duckType === 5) {
    return {      
      name: 'Crow',
      age: 5,
      favorite_food: 'Seeds',
      idleFrames: [
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-2.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
      ],
      walkFrames: [
        require('../images/CharacterSheet/CharacterSheet-21.png'),
        require('../images/CharacterSheet/CharacterSheet-22.png'),
        require('../images/CharacterSheet/CharacterSheet-23.png'),
        require('../images/CharacterSheet/CharacterSheet-24.png'),
      ],
      celebrateFrames: [
        require('../images/CharacterSheet/CharacterSheet-10.png'),
        require('../images/CharacterSheet/CharacterSheet-11.png'),
        require('../images/CharacterSheet/CharacterSheet-12.png'),
        require('../images/CharacterSheet/CharacterSheet-13.png'),
      ],
      deadFrames: [
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-34.png'),
        require('../images/CharacterSheet/CharacterSheet-35.png'),
        require('../images/CharacterSheet/CharacterSheet-36.png'),
      ],

    };
    
  } else if (duckType === 6) {
    return {
      idleFrames: [
        require('../images/Squid_Character/tile000.png'),
        require('../images/Squid_Character/tile001.png'),
        require('../images/Squid_Character/tile002.png'),
        require('../images/Squid_Character/tile003.png'),
        require('../images/Squid_Character/tile004.png'),
        require('../images/Squid_Character/tile005.png'),
        require('../images/Squid_Character/tile006.png'),
        require('../images/Squid_Character/tile007.png'),
      ],
      walkFrames: [
        require('../images/Squid_Character/tile008.png'),
        require('../images/Squid_Character/tile009.png'),
        require('../images/Squid_Character/tile010.png'),
        require('../images/Squid_Character/tile011.png'),
        require('../images/Squid_Character/tile012.png'),
      ],
      celebrateFrames: [
        require('../images/Squid_Character/tile056.png'),
        require('../images/Squid_Character/tile057.png'),
        require('../images/Squid_Character/tile058.png'),
        require('../images/Squid_Character/tile059.png'),
      ],
      deadFrames: [
        require('../images/Squid_Character/tile000.png'),
        require('../images/Squid_Character/tile001.png'),
        require('../images/Squid_Character/tile002.png'),
        require('../images/Squid_Character/tile050.png'),
        require('../images/Squid_Character/tile051.png'),
        require('../images/Squid_Character/tile052.png'),
        require('../images/Squid_Character/tile052.png'),
        require('../images/Squid_Character/tile052.png'),

      ],
      age: 5,
      favorite_food: 'Salad'
    };
  } else {
    // Default frames if not a SpriteAnimation duck
    return {
      idleFrames: [],
      walkFrames: [],
      celebrateFrames: [],
      deadFrames: [],
    };
  }
};
const Duck = ({ duckType, Optional: customStyle, decreaseHealth, increaseHealth, currentHealth}) => {
  const {earnCurrency} = useCurrency();
  const [panningDuration, setPanningDuration] = useState(0);
  const {isPettingLongEnough, setIsPettingLongEnough, playerHealth} = useContext(ReferenceDataContext);
  const [isInteraction, setInteraction] = useState(false);
  // Timer reference
  const timerRef = useRef(null);
  const { handleTap, handleSwipe } = useTap();
  const [showAngy, setShowAngy] = useState(false);
  const [isHGShown, setIsHGShown] = useState(false); // State to track if HG.gif is shown
  const { completeTask } = useTasks();

  // Method to return the current health value
  const getHealth = () => {
    return playerHealth;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      //console.log("PanResponder granted");
      // Start the timer when panning begins
      if (handleTap()) {
        console.log("Too much tapping bruh");
        setShowAngy(true);
        setTimeout(() => {
          setShowAngy(false);
        }, 400);
        decreaseHealth();
      }
      timerRef.current = setInterval(() => {
        setPanningDuration(prevDuration => prevDuration + 1000);
      }, 1000); // Update duration every second
    },

    onPanResponderRelease: () => {
      //console.log("PanResponder released");
      // Stop the timer and reset duration when panning ends
      setInteraction(false);
      clearInterval(timerRef.current);
      setPanningDuration(0);

      if (panningDuration >= 4000) {
        console.log("You have played with the pet for 5 seconds.");
        setIsPettingLongEnough(true);
        increaseHealth();
        console.log(isPettingLongEnough);
      }
    },


    onPanResponderTerminate: () => {
      console.log("PanResponder terminated");
      // Stop the timer and reset duration if the responder is terminated abruptly
      clearInterval(timerRef.current);
      setPanningDuration(0);
    },

    onPanResponderMove: (event, gestureState) => {
      handleSwipe(gestureState);
    },
  });

  useEffect(() => {
    console.log("Panning duration:", panningDuration / 1000);
    if (panningDuration >= 2000 && !isInteraction) {
      setInteraction(true);
      completeTask(1);
    }

    if (panningDuration >= 4000 && !isHGShown) {
      setIsHGShown(true); // Set isHGShown to true to prevent showing HG.gif again
      // Stop celebrating after 2 seconds
      setTimeout(() => {
        setIsHGShown(false); // Reset isHGShown after 5 seconds
      }, 5000); // Change this to 5000 to show HG for 5 seconds
    }
  }, [panningDuration]);

  // const handCursor = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (event, gestureState) => {
  //       handleSwipe(gestureState);
    
  //     },
  //     // Add other necessary PanResponder handlers
  //   })
  // ).current;

  // const handleDuckTap = () => {
  //   if (handleTap()) {
  //     console.log(hey);
  //   }
  // }

  let duckContent;
  let duckInfo;

  if (duckData.hasOwnProperty(duckType)) {
    duckInfo = duckData[duckType];
  } else {
    duckInfo = duckData[0];
  }


  const spriteFrames = getSpriteFrames(duckType);


  if (duckType === 5 || duckType === 6) {
    duckContent = (
      <SpriteAnimation
        onIdleAnimationFinish={() => {}}
        idleFrames={spriteFrames.idleFrames}
        walkFrames={spriteFrames.walkFrames}
        celebrateFrames={spriteFrames.celebrateFrames}
        deadFrames={spriteFrames.deadFrames}
        decreaseHealth={decreaseHealth}
        increaseHealth={increaseHealth}
        currentHealth= {currentHealth}
      />
    );
  } else {
    // Default to image if not a SpriteAnimation duck
    duckContent = (
      // <TouchableOpacity onPress={handleDuckTap}>
      <Image
        // {...handCursor.panHandlers}
        {...panResponder.panHandlers}
        source={duckInfo.imageSource}
        style={{ width: window.width * 0.58, height: window.width * 0.58 }}
      />
      // </TouchableOpacity>
    );
  }

  const imageWidth = window.width * 0.58;
  const imageHeight = imageWidth;

  return (
    <View style={[{ position: 'relative' }, customStyle]}>
      {/* <TouchableWithoutFeedback onPress={handleDuckTap} ref={duckRef}> */}
      {duckContent}
      <View style={{ display: 'none' }}>
        <FriendshipLevel id={duckType} />
      </View>
      {isInteraction && (
        <Image
          source={require('../images/cartoon-thought_fight.png')}
          style={{
            position: 'absolute',
            top: -60, 
            left: 155,
            width: 140, 
            height: 120,
          }}
        />
      )}
      {isHGShown && (
        <Image
          source={HG}
          style={{
            position: 'absolute',
            bottom: 100,
            right: -60,
            width: 350, // Assuming HG.gif should cover the whole screen
            height: 350,
            zIndex:2000
          }}
        />
      )}
      {showAngy && (
        <Image
          source={angy}
          style={{
            position: 'absolute',
            top: 25,
            left: 10,
            width: 70,
            height: 70,
          }}
        />
      )}
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}

export default Duck;
