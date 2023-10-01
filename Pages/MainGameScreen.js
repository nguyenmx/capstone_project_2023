import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert} from 'react-native';


function MainGameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello from Mary! :O</Text>
      <Button
        title="Main Game"
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <Button
        title="Story Mode"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Button
        title="Combat Mode"
        onPress={() => Alert.alert('Simple Button pressed')}
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
