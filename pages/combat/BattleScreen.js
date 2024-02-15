import React, {useState, useContext, useRef}  from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Modal} from 'react-native';
import backgroundImage from '../../images/Backgrounds/background.gif';
import rock from '../../images/CombatScreen/rock.png';
import scissor from '../../images/CombatScreen/scissor.png';
import paper from '../../images/CombatScreen/paper.png';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/CharDuck';
import OpponentDuck from '../../modules/OpponentDuck';
import explosion from '../../images/CombatScreen/explosion.gif';
import BackArrow from  '../../modules/BackArrow';
import CombatModeLogic from '../../components/combat_logic/CombatModeLogic';
import paperBubble from '../../images/CombatScreen/cartoon-thought-paper.png';
import rockBubble from '../../images/CombatScreen/cartoon-thought-rock.png';
import scissorsBubble from '../../images/CombatScreen/cartoon-thought-scissors.png';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';

const window = Dimensions.get('window');

//IMPORTANT: create an instance of the CombatModeLogic here
const combatMode = new CombatModeLogic();
const BattleScreen = ({ navigation}) => {
const { selectedDuck, name, setName } = useContext(ReferenceDataContext);
const playerHealthRef = useRef(null);
const enemyHealthRef = useRef(null);
const [playerExplode, setPlayerExplodeVisible] = useState(false);
const [oppExplode, setOppExplodeVisible] = useState(false);
const [playerMoveBubble, setPlayerMoveBubble] = useState(false);
const [oppMoveBubble, setOppMoveBubble] = useState(false);
const { steps, setSteps } = useContext(ReferenceDataContext);

function getRandomNumber() {
  return Math.floor(Math.random() * (21000 - 1000 + 1)) + 1000;
}


explosionAnimation = (playerWon) => {
  if (playerWon) {
    setTimeout(() => {
    setOppExplodeVisible(true);
    setTimeout(() => {
      setOppExplodeVisible(false);
    }, 2300)
  }, 2200);
  }
  if(playerWon == false) {
    setTimeout(() => {
    setPlayerExplodeVisible(true);
    setTimeout(() => {
      setPlayerExplodeVisible(false);
    }, 2300)
  }, 2300);
  }
  if (playerWon == null) {
    setPlayerExplodeVisible(false);
    setOppExplodeVisible(false);
  }
}

const oppBubbleAnimation = (move) => {
  oppMove = combatMode.getOppMove();
  // Wait for a couple of seconds before setting the opponent's move bubble
  setTimeout(() => {
    setOppMoveBubble(move);

    // Reset the opponent's move bubble after a timeout
    setTimeout(() => {
      setOppMoveBubble(null);
    }, 1900);
  }, 800); // Adjust the delay according to your needs
};

const playerBubbleAnimation = (move) => {
  setPlayerMoveBubble(move);
  // Reset the player move after a timeout
  setTimeout(() => {
    setPlayerMoveBubble(null);
  }, 2800);
};

const handlePress = (move) => {
  combatMode.playerPowerDamage(steps);
  combatMode.oppPowerDamage(getRandomNumber());
  combatMode.setPlayerMove(move);
  combatMode.setOppMove();
  const playerWon = combatMode.playerWon();
  
  playerBubbleAnimation(move);
  oppBubbleAnimation(combatMode.getOppMove());
  explosionAnimation(playerWon);
  console.log(combatMode.playerWon());

  if (playerWon === null) {
    // If it's a tie
    console.log("It's a tie!");
  } else if (playerWon) {
    // If player wins, introduce a delay before updating the opponent's health bar
    setTimeout(() => {
      enemyHealthRef.current.decreaseHealth_2(combatMode.getPlayerPower());
      if (enemyHealthRef.current.getHealth() <= 0) {
        // Navigate to WinScreen when enemy health reaches zero
        navigation.navigate('WinScreen');
      }
      console.log("Player wins!");
    }, 2500); // Adjust the delay timing as needed
  } else {
    // If player loses, introduce a delay before updating the player's health bar
    setTimeout(() => {
      playerHealthRef.current.decreaseHealth_2(combatMode.getOppPower());
      if (playerHealthRef.current.getHealth() <= 0) {
        // Navigate to LossScreen when player health reaches zero
        navigation.navigate('LossScreen');
      }
      console.log("Player loses!");
    }, 2500); // Adjust the delay timing as needed
  }
};



  const getImageForMove = (move) => {
    switch (move) {
      case 'rock':
        return rockBubble;
      case 'paper':
        return paperBubble;
      case 'scissors':
        return scissorsBubble;
      default:
        return null; // Handle default case or return a default image
    }
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.playerOppContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CombatMode')}>
        <BackArrow></BackArrow>
        </TouchableOpacity>
        <HealthBar ref={enemyHealthRef} barName="EnemyHealth" />
          <View style={styles.oppContainer}>
          <OpponentDuck></OpponentDuck>
            {oppMoveBubble && <Image source={getImageForMove(oppMove)} style={styles.bubbleImage} />}
            {oppExplode && <Image source={explosion} style={styles.explosionImageYou}></Image>}
          </View>
          <Text style={styles.name}>{ name ? `${name}` : 'Player' }</Text>

          <View style={styles.playerContainer}>
            <Animal duckType={selectedDuck}></Animal>
            {playerMoveBubble && <Image source={getImageForMove(playerMove)} style={styles.bubbleImage} />}
            {playerExplode && <Image source={explosion} style={styles.explosionImageMe}></Image>}
          </View>
          <HealthBar ref={playerHealthRef} barName="PlayerHealth" />
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handlePress("rock")}>
            <Image source={rock} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress("paper")}>
            <Image source={paper} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress("scissors")}>
            <Image source={scissor} style={styles.image} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    top: 240,
    right: 50,
    zIndex: 1,
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: window.width * 0.05,
    color: 'white',
  },   
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerOppContainer: {
    width: '100%', // Adjusted to a percentage value
    aspectRatio: 384 / 96,
    alignItems: 'center',
    justifyContent: 'flex-end', // Align content to the bottom of the container
    marginTop: window.height * 0.73,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  oppContainer: {
    marginRight: 170,
    marginTop: 10
  },
  playerContainer: {
    marginLeft: 150,
    transform: [{ scaleX: -1 }],
    marginBottom: -50
  },
  explosionImageMe: {
    position: 'absolute',
    top: 0,
    left: 35,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  explosionImageYou: {
    position: 'absolute',
    top: 0,
    left: 40,
    bottom: 0,
    resizeMode: 'contain',
  },
  bubbleImage: {
    position: 'absolute',
    top: 0,
    right: -128,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  }
});

export default BattleScreen;