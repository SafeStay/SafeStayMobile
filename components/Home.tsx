import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./Map";
import { useState, useEffect } from "react";
import { Crime } from "./CrimeFetch";
import { FirebaseHotels, FirebaseDeleteHotelData } from "./FirebaseHotels";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "./Search";

import { Firebase, FirebaseDeleteCrimeData } from "./firebase";

const Home: React.FC = () => {
    // State for following the users location on map
    const [currentRegion, setCurrentRegion] = useState<{ latitude: number; longitude: number } | null>(null)
    const [crimes, setCrimes] = useState<Crime[]>([])

    // need to fetch here to pass the crimes to the Map.tsx - component

    // using the 'currentRegion' as the prop so that the map shows 
    // crimes based on where the user is on the map

    //area is still a mile
    //could be changed to depend on how zoomed out or in the user is


    /*     useEffect(() => {
            const fetchCrimes = async () => {
                try {
                    if (!currentRegion) return;
                    const response = await fetch(
                        `https://data.police.uk/api/crimes-street/all-crime?lat=${currentRegion.latitude}&lng=${currentRegion.longitude}`
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch street crimes');
                    }
                    const data: Crime[] = await response.json();
                    setCrimes(data);
                } catch (error) {
                    console.error('Error fetching street crimes:', error);
                }
            };
    
            fetchCrimes();
        }, [currentRegion]); */

    useEffect(() => {
        //FirebaseDeleteCrimeData();
        //Firebase();

        //FirebaseDeleteHotelData();
        FirebaseHotels();
    }, []);

    // function used to close the keyboard when pressing on the screen
    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }

    // function used to update the region state
    const handleRegionChangeComplete = (region: { latitude: number; longitude: number }) => {
        setCurrentRegion(region)

        //console logging the current region
        //console.log("Current region: ", region)
    }

    const Tab = createBottomTabNavigator();


    return (

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image
                        style={{ width: 259, height: 48 }}
                        source={require('../pictures/safestay1.png')}
                    />
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Address or location name"
                        style={styles.textInputStyle}
                    />
                    <Button
                        title="Search"
                    />
                </View>


                <Map
                    onRegionChangeComplete={handleRegionChangeComplete}
                    crimes={crimes}
                />
                <StatusBar style="auto" />
            </View>

        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },

    textInputStyle: {
        backgroundColor: '#cee7ed',
        width: '73%'
    },

    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%'
    }

});

export default Home;
