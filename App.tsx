import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HotelContext } from './components/HotelContext';
import Home from './components/Home';
import Login from './components/Login';
import HotelList from './components/HotelList';
import CrimeList from './components/CrimeList';
import CrimeDetails from './components/CrimeDetails';
import Search from './components/Search';
import { Feather } from '@expo/vector-icons';
import fetchHotelDataFromFirestore from './components/HotelMap';
import { Hotel } from './components/Interface';

const App: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Map") {
              iconName = focused ? "map-pin" : "map-pin";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search";
            } else if (route.name === "Login") {
              iconName = focused ? "user" : "user";
            }
            return (
              <Feather
                name={iconName as any}
                size={size}
                color={color}
                style={{ marginBottom: -4 }}
              />
            );
          },
          tabBarLabel: "",
          tabBarActiveTintColor: "#649BAB",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            maxHeight: "6%",
            paddingBottom: 1,
          },
          safeAreaInsets: {
            bottom: 0,
          },
        })}
      >
        <Tab.Screen
          name="Map"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Search"
          component={StackNavigator}
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
};

const StackNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();

  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // Haetaan hotellidata vain kerran sovelluksen käynnistyessä
    fetchHotelData();
  }, []);

  const fetchHotelData = async () => {
    try {
      const data = await fetchHotelDataFromFirestore();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchPage"
        component={Search}
        options={{ headerShown: false }}
      />
      {/* Hotellidata välitetään HotelList-komponenttiin propsina */}
      <Stack.Screen
            name="HotelList"
            options={{ headerShown: false }}
          >
            {props => <HotelList {...props} hotels={hotels} />}
          </Stack.Screen>
      <Stack.Screen
        name="CrimeList"
        component={CrimeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrimeDetails"
        component={CrimeDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default App;
