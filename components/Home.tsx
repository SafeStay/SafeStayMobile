import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./Map";
import { useState, useEffect } from "react";
import { Crime } from "./Interface";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import fetchHotelDataFromFirestore from "./HotelMap";
import { Hotel } from "./HotelList";
import { styles } from "./styles";

import { fetchCrimeData } from "./FirebaseCrimes";

import { Firebase, FirebaseDeleteCrimeData } from "./firebase";
import Search from "./Search";
import { NavigationContainer } from "@react-navigation/native";
import { FirebaseHotels, FirebaseDeleteHotelData } from "./FirebaseHotels";

const Home: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);

    /* Fetch the hotel data from Firestore when app is launched */
    useEffect(() => {
        fetchHotels();
    }, []);

    /* Check if hotels state is not empty, call fetchCrimeData function and pass hotels state as a prop to it */
    useEffect(() => {
        if (hotels.length > 0) {
            fetchCrimeData(hotels);
        }
    }, [hotels]);

    const fetchHotels = async () => {
        try {
            const hotelData = await fetchHotelDataFromFirestore();
            setHotels(hotelData);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    //console.log("tallentuuko hotelstateen hotelliobjektille sama id kuin firestoressa: " + JSON.stringify(hotels))

    /* 
    TODO:
    - hotel interface updatettu
    - FirebaseHotels.tsx: muutettu collection nimi
    - Home.tsx: aktivoitu useEffect jotta haetaan testihotellidata collectionille hotellit. Huom, hae 
    kaikki 3 linkkiä
    - HotelMap.tsx: fetchHotelDataFromFirestore() funktion muokkaus, jossa talletetaan apin sisäiseen 
    hotels stateen myös hotellin id
    kts. chatGPT
    
    */


    //useEffect(() => {
    //FirebaseDeleteCrimeData();
    //Firebase();
    //FirebaseDeleteHotelData();
    //FirebaseHotels();
    //fetchHotelDataFromFirestore();
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
