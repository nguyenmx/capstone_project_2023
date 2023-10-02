import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainGameScreen from './Pages/MainGameScreen';
import ProfileScreen from './Pages/ProfileScreen';
import CombatMode from './Pages/CombatMode';
import StoryMode from './Pages/StoryMode';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainGameScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Combat Mode" component={CombatMode} />
        <Stack.Screen name="Story Mode" component={StoryMode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

