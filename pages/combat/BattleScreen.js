import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import backgroundImage from '../../images/background.gif';
import rock from '../../images/rock.png';
import scissor from '../../images/scissor.png';
import paper from '../../images/paper.png';
import player from '../../images/combatDuck2.gif';
import healthBar from '../../images/healthBar.png';
import opponent from '../../images/combatDuck.gif';
import HealthBar from '../../modules/HealthBar';
import Animal from '../../modules/Animal';
import OpponentDuck from '../../modules/OpponentDuck';
//import CombatModeLogic from "../../components/CombatModeLogic";

const window = Dimensions.get('window');
const BattleScreen = ({ navigation }) => {
// const combatLogic = new CombatModeLogic();

return (
  <View style={styles.container}>
  <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
  <View style= {styles.playerOppContainer}>
    <HealthBar></HealthBar>
    <Animal></Animal>
    <HealthBar></HealthBar>
    <OpponentDuck></OpponentDuck>
  </View>
    <View style={styles.imageContainer}>
      <Image source={rock} style={styles.image}/>
      <Image source={paper} style={styles.image}/>
      <Image source={scissor} style={styles.image}/>
    </View>
  </ImageBackground>
</View>
  );
};

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
});

export default BattleScreen;
