import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import menuBackground from '../images/2ef.gif';

function MainGameScreen({ navigation }) {
  return (
  <View style={styles.container}>
      <ImageBackground source={menuBackground} style={styles.image}>
        <Text style={styles.baseText}>
          Denwa Petto
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
        <Text style={styles.appButtonText}>Main Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StoryMode')}
        >
        <Text style={styles.appButtonText}>Story Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CombatMode')}
        >
        <Text style={styles.appButtonText}>Combat Mode</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </ImageBackground>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 73,
    justifyContent: 'center',
    alignItem: 'center',
    
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    
    
  },

  appButtonText: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

});
export default MainGameScreen;
