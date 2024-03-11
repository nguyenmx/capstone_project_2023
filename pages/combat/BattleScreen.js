import React, {useState, useContext, useRef}  from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Modal, Animated} from 'react-native';
import backgroundImage from '../../images/Backgrounds/background.gif';
import rock from '../../images/CombatScreen/rock.png';
import scissor from '../../images/CombatScreen/scissor.png';
import paper from '../../images/CombatScreen/paper.png';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/CharDuck';
import OpponentDuck from '../../modules/OpponentDuck';
import explosion from '../../images/CombatScreen/explosion.gif';
import BackArrow from  '../../modules/BackArrow';
import banner from '../../images/CombatScreen/UpdatedCombatUI/banner.png';
import attack from '../../images/CombatScreen/UpdatedCombatUI/killmove.png';
import nameUI from '../../images/CombatScreen/UpdatedCombatUI/nameUI.png';
import warningIcon from '../../images/CombatScreen/UpdatedCombatUI/warning.png';
import CombatModeLogic from '../../components/combat_logic/CombatModeLogic';
import paperBubble from '../../images/CombatScreen/cartoon-thought-paper.png';
import rockBubble from '../../images/CombatScreen/cartoon-thought-rock.png';
import scissorsBubble from '../../images/CombatScreen/cartoon-thought-scissors.png';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import { useTasks } from '../../components/TasksContext';
import { useCurrency } from '../../components/CurrencyContext'; 

const window = Dimensions.get('window');

//IMPORTANT: create an instance of the CombatModeLogic here
const combatMode = new CombatModeLogic();
const BattleScreen = ({ navigation }) => {
  const { selectedDuck, name, playerHealth, setPlayerHealth, setName } = useContext(ReferenceDataContext);
  const playerHealthRef = useRef(null);
  const enemyHealthRef = useRef(null);
  const [playerExplode, setPlayerExplodeVisible] = useState(false);
  const [oppExplode, setOppExplodeVisible] = useState(false);
  const [playerMoveBubble, setPlayerMoveBubble] = useState(false);
  const [oppMoveBubble, setOppMoveBubble] = useState(false);
  const [playerWarning, setPlayerWarningVisible] = useState(false);
  const [playerAttack, setPlayerAttackVisible] = useState(false);
  const [oppWarning, setOppWarningVisible] = useState(false);
  const [oppAttack, setOppAttackVisible] = useState(false);
  const [playerDamageTaken, setPlayerDamageTaken] = useState(0);
  const [oppDamageTaken, setOppDamageTaken] = useState(0);

  const { steps, setSteps } = useContext(ReferenceDataContext)
  const moveAnimation = new Animated.Value(0);
  const [initialPlayerHealth] = useState(playerHealth);
  const { completeTask } = useTasks();
  const { earnCurrency } = useCurrency();

function getRandomNumber() {
  return Math.floor(Math.random() * (21000 - 1000 + 1)) + 1000;
}
explosionAnimation = (playerWon) => {
  if (playerWon) {
    setTimeout(() => {
    setOppExplodeVisible(true);
    setTimeout(() => {
      setOppExplodeVisible(false);
    }, 2400)
  }, 2400);
  }
  if(playerWon == false) {
    setTimeout(() => {
    setPlayerExplodeVisible(true);
    setTimeout(() => {
      setPlayerExplodeVisible(false);
    }, 2400)
  }, 2400);
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
  }, 500); // Adjust the delay according to your needs
};

const playerBubbleAnimation = (move) => {
  setPlayerMoveBubble(move);
  // Reset the player move after a timeout
  setTimeout(() => {
    setPlayerMoveBubble(null);
  }, 1900);
};
const warningAnimation = (playerWon) => {
  if (playerWon) {
    setTimeout(() => {
    setOppWarningVisible(true);
    
    setTimeout(() => {
      setOppWarningVisible(false);
    }, 2300)
  }, 2200);
  }
  if(playerWon == false) {
    setTimeout(() => {
    setPlayerWarningVisible(true);
    setTimeout(() => {
      setPlayerWarningVisible(false);
    }, 2300)
  }, 2300);
  }
  if (playerWon == null) {
    setPlayerWarningVisible(false);
    setOppWarningVisible(false);
  }
}

const DamageAnimation = () => {
  
}
const attackAnimation = (playerWon) => {
  if (playerWon) {
    setTimeout(() => {
    setPlayerAttackVisible(true);
    setTimeout(() => {
      setPlayerAttackVisible(false);
    }, 2300)
  }, 2200);
  }
  if(playerWon == false) {
    setTimeout(() => {
    setOppAttackVisible(true);
    setTimeout(() => {
      setOppAttackVisible(false);
    }, 2300)
  }, 2200);
  }
  if (playerWon == null) {
    setPlayerAttackVisible(false);
    setOppAttackVisible(false);
  }
}

const handlePress = (move) => {
  combatMode.playerPowerDamage(steps);
  combatMode.oppPowerDamage(getRandomNumber());
  //combatMode.oppPowerDamage(60000); // high number to make testing losses easier
  combatMode.setPlayerMove(move);
  combatMode.setOppMove();
  const playerWon = combatMode.playerWon();

  playerBubbleAnimation(move);
  oppBubbleAnimation(combatMode.getOppMove());
  explosionAnimation(playerWon);
  warningAnimation(playerWon);
  attackAnimation(playerWon);
  console.log(combatMode.playerWon());

  if (playerWon === null) {
    // If it's a tie
    console.log("It's a tie!");
  } else if (playerWon) {
    // If player wins, introduce a delay before updating the opponent's health bar
    setTimeout(() => {
      const damage = combatMode.getPlayerPower();
      enemyHealthRef.current.decreaseHealth_2(damage);
      setOppDamageTaken(damage);
      if (enemyHealthRef.current.getHealth() <= 0) {
        // Navigate to WinScreen when enemy health reaches zero
        setPlayerHealth(initialPlayerHealth + Math.round(playerHealthRef.current.getHealth() * 0.15));
        console.log("initial health updated after win to: ", initialPlayerHealth);
        earnCurrency('coins');
        navigation.navigate('WinScreen');

      }
      console.log("Player wins!");
    }, 2500); // Adjust the delay timing as needed
  } else {
    // If player loses, introduce a delay before updating the player's health bar
    setTimeout(() => {
      const damage = combatMode.getOppPower();
      playerHealthRef.current.decreaseHealth_2(damage);
      setPlayerDamageTaken(damage);
      const finalPlayerHealth = playerHealthRef.current.getHealth();

      if (finalPlayerHealth <= 0) {
        // Navigate to LossScreen when player health reaches zero
        setPlayerHealth(initialPlayerHealth - Math.round(enemyHealthRef.current.getHealth() * 0.15));
        console.log("initial health updated after loss to: ", initialPlayerHealth);
        navigation.navigate('LossScreen');
        completeTask(3);
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
        <View style={styles.botContainer}>
          <View style={styles.nameContainer}>
            <Image source={nameUI} style={styles.whiteRectangle}></Image>
            <Text style={styles.botName}>Combat Bot</Text>
            <Text style={styles.damageTaken}>{`-${oppDamageTaken} HP`}</Text>
            <View style= {styles.OppHealthBar} >
              <HealthBar ref={enemyHealthRef} barName="EnemyHealth"/>
            </View>
            {/* <Image source={warningIcon} style={styles.warningIcon}></Image> */}
          </View>
          <View style={styles.duckOppContainer}>
           <OpponentDuck></OpponentDuck>
           {oppMoveBubble && <Image source={getImageForMove(oppMove)} style={styles.bubbleImage} />}
           {oppAttack && <Image source={attack} style={styles.attackMove}></Image>}
           {oppExplode && <Image source={explosion} style={styles.explosionImageYou}></Image>}
          
           </View>
        </View>

        <View style={styles.playerContainer}>
          <View style={styles.nameContainer}>
            <Image source={nameUI} style={styles.whiteRectanglePlayer}></Image>
            <Text style={styles.playerName}>{ name ? `${name}` : 'Player' }</Text>
            <Text style={styles.playerDamageTaken}>{`-${playerDamageTaken} HP`}</Text>
            <View style= {styles.playerHealthBar} >
            <HealthBar ref={playerHealthRef} currentHealthProp={playerHealth} barName="PlayerHealth" />
            </View>
            {playerWarning && <Image source={warningIcon} style={styles.playerWarningIcon}></Image>}
          </View>
          <View style={styles.duckContainer}>
          <Animal duckType={selectedDuck}></Animal>
          {playerMoveBubble && <Image source={getImageForMove(playerMove)} style={styles.bubbleImageP} />}
          {playerAttack && <Image source={attack} style={styles.attackMove}></Image>}
          {playerExplode && <Image source={explosion} style={styles.explosionImageMe}></Image>}
          </View>
        </View>
      
        {/* <Image source={banner} style={styles.banner}></Image> */}
        <View style={styles.buttonContainer}>
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
  botName: {
    right: 10,
    zIndex: 1,
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 28,
    color: 'darkgreen',
  },
  playerName: {
    left: 45,
    zIndex: 1,
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 28,
    color: 'darkgreen',
  },
  whiteRectangle: {
    top: window.width * 0.2,
    right: 40,
    width: 322,
    height: 95
  },
  whiteRectanglePlayer: {
    top: window.width * 0.2,
    right: -20,
    width: 322,
    height: 95,
    transform: [{ scaleX: -1 }]
  },
  damageTaken: {
    right: 23,
    zIndex: 1,
    fontFamily: 'BowlbyOneSC-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 20,
    color: 'red',
  },
  warningIcon: {
    left: 240,
    top: -225
  },
  playerWarningIcon: {
    left: 260,
    top: -220
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
  OppHealthBar: {
    top: -85,
    right: -42,
  },
  playerHealthBar: {
    top: -85,
    left: 20,
    transform: [{ scaleX: -1 }],

  },
  playerDamageTaken: {
    left: 35,
    zIndex: 1,
    fontFamily: 'BowlbyOneSC-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 20,
    color: 'red',
  },
  duckOppContainer: {
    displayflex: 'row',
    top: -100,
    left: -85
  },
  duckContainer: {
    displayflex: 'row',
    top: 180,
    left: 140,
    transform: [{ scaleX: -1 }],
    position: 'absolute'
  },
  playerContainer: {
    top: -230,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 750
  },
  banner: {
    left: 280,
    width: 350

  },
  image: {
    width: 20,
    height: 20,
  },
  botContainer: {
    top: -30
  },
  image: {
    width: 85,
    height: 85,
  },
  nameContainer: {
    left: 10
  },
  explosionImageMe: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  explosionImageYou: {
    position: 'absolute',
    left: 35,
    resizeMode: 'contain',
  },
  attackMove: {
    position: 'absolute',
    left: 150,
    resizeMode: 'contain',
  },
  bubbleImage: {
    position: 'absolute',
    top: 0,
    right: -60,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  },
  bubbleImageP: {
    position: 'absolute',
    left: 210,
    top: 0,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  }
});

export default BattleScreen;