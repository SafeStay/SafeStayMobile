import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./Map";
import { useState, useEffect } from "react";
import { Crime } from "./Interface";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";

import { FirebaseDeleteCrimeData } from "./firebase";
import fetchHotelDataFromFirestore from "./HotelMap";
import { Hotel } from "./HotelList";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { FirebaseHotels, FirebaseDeleteHotelData } from "./FirebaseHotels";
import { fetchCrimeData } from "./FirebaseCrimes";

const Home: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);

    // Fetch hotels from Firestore when component mounts
    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const hotelData = await fetchHotelDataFromFirestore();
            setHotels(hotelData);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    //useEffect(() => {
    //FirebaseDeleteCrimeData();
    //Firebase();
    //FirebaseDeleteHotelData();
    //FirebaseHotels();
    //fetchHotelDataFromFirestore();
    fetchCrimeData();
    //}, []);

    // function used to close the keyboard when pressing on the screen
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    // function used to update the region state
    const handleRegionChangeComplete = (region: {
        latitude: number;
        longitude: number;
    }) => {
        //setCurrentRegion(region);
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
                    onRegionChangeComplete={handleRegionChangeComplete}
                    hotels={hotels}
                />
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
};



export default Home;
