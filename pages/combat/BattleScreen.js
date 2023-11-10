import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import backgroundImage from '../../images/background.gif';
import rock from '../../images/rock.png';
import scissor from '../../images/scissor.png';
import paper from '../../images/paper.png';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/BananaDuck';
import OpponentDuck from '../../modules/OpponentDuck';
//import Explosion from '../../modules/Explosion';
import explosion from '../../images/explosion.gif';
//import {handleRockClick, handlePaperClick, handleScissorClick, isExplosionVisible} from '../../components/CombatModeLogic'
//import { CombatModeLogic } from '../../components/CombatModeLogic';

const window = Dimensions.get('window');
const BattleScreen = ({ navigation}) => {

//const combatLogic = new CombatModeLogic();
const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.playerOppContainer}>
          <HealthBar></HealthBar>
          <View style={styles.animalContainer}>
            <Animal></Animal>
          </View>
          <View style={styles.oppContainer}>
            <OpponentDuck></OpponentDuck>
            {modalVisible && <Image source={explosion} style={styles.explosionImage}></Image>}
          </View>
          <HealthBar></HealthBar>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handlePress()}>
            <Image source={rock} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress()}>
            <Image source={paper} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress()}>
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
    width: '80%', // Adjusted to a percentage value
    aspectRatio: 384 / 96,
    alignItems: 'center',
    justifyContent: 'flex-end', // Align content to the bottom of the container
    marginTop: window.height * 0.65,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  animalContainer: {
    marginRight: 180,
    marginTop: 10
  },
  oppContainer: {
    marginLeft: 180,
    transform: [{ scaleX: -1 }],
    marginTop: -80
  },
  explosionImage: {
    position: 'absolute',
    top: 0,
    left: 35,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  }
});

export default BattleScreen;
