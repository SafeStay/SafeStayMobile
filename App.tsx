import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login"
import { Feather } from '@expo/vector-icons';

const App: React.FC = () => {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused
                ? 'map-pin'
                : 'map-pin';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Login') {
              iconName = focused ? 'user' : 'user';
            }
            return <Feather name={iconName as any} size={size} color={color} style={{ marginBottom: -4 }} />;
          },
          tabBarLabel: '',
          tabBarActiveTintColor: '#649BAB',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            maxHeight: "6%",
            paddingBottom: 1,
          },
          safeAreaInsets: {
            bottom: 0,
          },
        })}>
        <Tab.Screen
          name="Map"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  );
}



export default App;
