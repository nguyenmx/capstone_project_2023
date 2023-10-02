import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert} from 'react-native';


function MainGameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Main Game"
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <Button
        title="Story Mode"
        onPress={() => navigation.navigate('StoryMode')}
      />
      <Button
        title="Combat Mode"
        onPress={() => navigation.navigate('CombatMode')}
      />

      <StatusBar style="auto" />
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
});
export default MainGameScreen;
