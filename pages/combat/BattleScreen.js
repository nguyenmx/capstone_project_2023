import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Modal} from 'react-native';
import backgroundImage from '../../images/background.gif';
import rock from '../../images/rock.png';
import scissor from '../../images/scissor.png';
import paper from '../../images/paper.png';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/CharDuck';
import OpponentDuck from '../../modules/OpponentDuck';
import explosion from '../../images/explosion.gif';
import BackArrow from  '../../modules/BackArrow';
import CombatModeLogic from '../../components/CombatModeLogic';
import paperBubble from '../../images/cartoon-thought-paper.png';
import rockBubble from '../../images/cartoon-thought-rock.png';
import scissorsBubble from '../../images/cartoon-thought-scissors.png';

const window = Dimensions.get('window');

//IMPORTANT: create an instance of the CombatModeLogic here
const combatMode = new CombatModeLogic();

const BattleScreen = ({ navigation}) => {

const [playerExplode, setPlayerExplodeVisible] = useState(false);
const [oppExplode, setOppExplodeVisible] = useState(false);
const [playerMoveBubble, setPlayerMoveBubble] = useState(false);
const [oppMoveBubble, setOppMoveBubble] = useState(false);
// const [rockMove, setRockMoveVisible] = useState(false);
// const [paperMove, setPaperMoveVisible] = useState(false);
// const [scissorsMove, setScissorsMoveVisible] = useState(false);


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
    }, 2800);
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
    combatMode.setPlayerMove(move);
    combatMode.setOppMove();
    const playerWon = combatMode.playerWon();
    playerBubbleAnimation(move);
    oppBubbleAnimation(combatMode.getOppMove());
    explosionAnimation(playerWon);
    console.log(combatMode.playerWon());
  }

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
          <HealthBar></HealthBar>
          <View style={styles.oppContainer}>
            <Animal></Animal>
            {oppMoveBubble && <Image source={getImageForMove(oppMove)} style={styles.bubbleImage} />}
            {oppExplode && <Image source={explosion} style={styles.explosionImageYou}></Image>}
          </View>
          <View style={styles.playerContainer}>
            <OpponentDuck></OpponentDuck>
            {playerMoveBubble && <Image source={getImageForMove(playerMove)} style={styles.bubbleImage} />}
            {playerExplode && <Image source={explosion} style={styles.explosionImageMe}></Image>}
          </View>
          <HealthBar></HealthBar>
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
    marginRight: 200,
    marginTop: 10
  },
  playerContainer: {
    marginLeft: 200,
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
    left: 5,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  bubbleImage: {
    position: 'absolute',
    top: 0,
    right: -130,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  }
});

export default BattleScreen;
