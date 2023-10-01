import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, SafeAreaView,
Text, Alert} from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>What's your pet's name?</Text>
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
export default ProfileScreen;
