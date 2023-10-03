import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert} from 'react-native';

// import { Font } from 'expo';

// async function loadFonts() {
//   await Font.loadAsync({
//     'Pixelony': require('./assets/fonts/pixel font-7.ttf'),
//   });
// }
// loadFonts();

function CombatMode({ navigation }) {
  return (
    <View style={styles.container}>
       <Text style={styles.baseText}>
        Welcome to Combat Mode
        </Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    fontSize: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CombatMode;