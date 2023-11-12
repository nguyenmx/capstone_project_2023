import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Modal} from 'react-native';
import backgroundImage from '../../images/background.gif';
import rock from '../../images/rock.png';
import scissor from '../../images/scissor.png';
import paper from '../../images/paper.png';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/BananaDuck';
import OpponentDuck from '../../modules/OpponentDuck';
import explosion from '../../images/explosion.gif';
import BackArrow from  '../../modules/BackArrow';
import CombatModeLogic from '../../components/CombatModeLogic';

const window = Dimensions.get('window');

//IMPORTANT: create an instance of the CombatModeLogic here
const combatMode = new CombatModeLogic();

const BattleScreen = ({ navigation}) => {

const [playerExplode, setPlayerExplodeVisible] = useState(false);
const [oppExplode, setOppExplodeVisible] = useState(false);

  const handlePressRock = () => {
    combatMode.setPlayerMove("rock");
    combatMode.setOppMove();
    setOppExplodeVisible(true);
    setTimeout(() => {
      setOppExplodeVisible(false);
    }, 1000);
  };

  const handlePressPaper = () => {
    combatMode.setPlayerMove("paper");
    combatMode.setOppMove();
    setPlayerExplodeVisible(true);
    setTimeout(() => {
      setPlayerExplodeVisible(false);
    }, 1000);
  };

  const handlePressScissors = () => {
    combatMode.setPlayerMove("scissor");
    combatMode.setOppMove();
    setPlayerExplodeVisible(true);
    setTimeout(() => {
      setPlayerExplodeVisible(false);
    }, 1000);
  };

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
          <View style={styles.animalContainer}>
            <Animal></Animal>
            {oppExplode && <Image source={explosion} style={styles.explosionImageYou}></Image>}
          </View>
          <View style={styles.oppContainer}>
            <OpponentDuck></OpponentDuck>
            {playerExplode && <Image source={explosion} style={styles.explosionImageMe}></Image>}
          </View>
          <HealthBar></HealthBar>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handlePressRock()}>
            <Image source={rock} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressPaper()}>
            <Image source={paper} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressScissors()}>
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
    marginTop: window.height * 0.70,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  animalContainer: {
    marginRight: 200,
    marginTop: 10
  },
  oppContainer: {
    marginLeft: 200,
    transform: [{ scaleX: -1 }],
    marginTop: -80
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
});

export default BattleScreen;
