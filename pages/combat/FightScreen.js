import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const window = Dimensions.get('window');
const backgroundImage = require('../../images/background.gif');

const FightScreen = ({ navigation }) => {
  const { name, setName } = useContext(ReferenceDataContext);
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <Text style={styles.titleText}>Fight Screen!</Text>
      <Text style={styles.content}>Ready to Fight{ name ? `, ${name}?` : '?' }</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CombatMode')}>
        <Text style={styles.buttonText}>Back To Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('BattleScreen')}>
        <Text style={styles.buttonText}>BattleScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('WinScreen')}>
        <Text style={styles.buttonText}>Win</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('LossScreen')}>
        <Text style={styles.buttonText}>Loss</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: window.height * 0.3,
    color: 'white'    
  },
  content: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonContainer: {
    backgroundColor: '#8BE3FF',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: window.width * 0.3,
    height: window.height * 0.05
  },
  buttonText: {
    color: 'white',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default FightScreen;
