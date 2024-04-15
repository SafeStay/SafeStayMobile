import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./Map";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import fetchHotelDataFromFirestore from "./HotelMap";
import { Hotel } from "./HotelList";
import { styles } from "./styles";

import { Crime } from "./Interface";
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


    const fetchHotels = async () => {
        try {
            const hotelData = await fetchHotelDataFromFirestore();
            setHotels(hotelData);
        } catch (error) {
            console.error("Error fetching hotels, this message is from Home.tsx:", error);
        }
    };

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