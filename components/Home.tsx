import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./Map";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import fetchHotelDataFromFirestore from "./HotelMap";
import { Hotel } from "./Interface";
import { styles } from "./styles";
import { HotelFS } from "./Interface";


const Home: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {

    /* call fetchCrimeData function with hotels state to update hotels with crimes, run when hotels state changes */
    /* useEffect(() => {
        if (hotels.length > 0) {
            fetchCrimeData(hotels);
        }
    }, [hotels]); */

    //useEffect(() => {
    //FirebaseDeleteHotelData();
    //FirebaseHotels();
    //}, []);

    // function used to close the keyboard when pressing on the screen
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const Tab = createBottomTabNavigator();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ width: 259, height: 48 }}
                        source={require("../pictures/safestay1.png")}
                    />
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Address or location name"
                        style={styles.textInputStyle}
                    />
                    <Button title="Search" />
                </View>

                <Map
                    hotels={hotels}
                />
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Home;