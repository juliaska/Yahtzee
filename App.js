import Gameboard from './components/Gameboard';
import Home from './components/Home';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';


const Tab = createBottomTabNavigator();

const HOME = 'Home';
const GAMEBOARD = 'Gameboard';
const SCOREBOARD = 'Scoreboard';

export default function App() {
  const [loaded] = useFonts({
    Orbitron: require('./fonts/Orbitron-VariableFont_wght.ttf'),
    Exo2: require('./fonts/Exo2-VariableFont_wght.ttf'),
});
if (!loaded) {
return null;
}
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={HOME}
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={GAMEBOARD}
          component={Gameboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="playcircleo" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={SCOREBOARD}
          component={Scoreboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="barschart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
