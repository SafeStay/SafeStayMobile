import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./components/Map";
import { useState, useEffect } from "react";
import { Crime } from './components/CrimeFetch';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login"
import { Feather } from '@expo/vector-icons';



const App: React.FC = () => {

  const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({ // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => {
            // Function tabBarIcon is given the focused state,
            // color and size params
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Login') {
              iconName = focused ? 'user' : 'user';
            }
            return <Feather name={iconName as any} size={size} color={color} />; //it returns an icon component
          },
          tabBarActiveTintColor: '#649BAB',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            //position: 'absolute',
            height: "7%",
            //bottom: 0
          },
        })

        }

      >
        <Tab.Screen
          name="Home"
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
