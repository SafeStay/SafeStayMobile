// App.tsx
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Crime } from "./CrimeFetch";
import Map from "./Map";

const API_KEY = "6c747bb7cbef4abb8c3ceb8ed6ca4467";

const App: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const mapRef = useRef<MapView>(null);

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${searchInput}&format=json&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();
      const results = data.results[0];

      const newRegion = {
        latitude: results.lat,
        longitude: results.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setCurrentRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        if (!currentRegion) return;
        const response = await fetch(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${currentRegion.latitude}&lng=${currentRegion.longitude}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch street crimes");
        }
        const data: Crime[] = await response.json();
        setCrimes(data);
      } catch (error) {
        console.error("Error fetching street crimes:", error);
      }
    };

    fetchCrimes();
  }, [currentRegion]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSearchButtonPress = () => {
    fetchCoordinates();
  };

  const handleRegionChangeComplete = (region: Region) => {
    setCurrentRegion(region);
  };

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
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
          <Button title="Search" onPress={handleSearchButtonPress} />
        </View>

        <Map
          ref={mapRef}
          initialRegion={{
            latitude: currentRegion ? currentRegion.latitude : 51.509865,
            longitude: currentRegion ? currentRegion.longitude : -0.118092,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          crimes={crimes}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  textInputStyle: {
    backgroundColor: "#cee7ed",
    width: "73%",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
});

export default App;
