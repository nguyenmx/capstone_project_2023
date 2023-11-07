import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReferenceDataContext } from "../ReferenceDataContext";

const FightScreen = ({ navigation }) => {
  const { name, setName } = useContext(ReferenceDataContext);
  return (
    <View style={styles.container}>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
  },
  buttonContainer: {
    backgroundColor: '#8BE3FF',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default FightScreen;
