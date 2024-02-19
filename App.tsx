import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import Map from "./components/Map";
import { useState } from "react";

const App: React.FC = () => {
  // State for following where the user is on the map
  const [currentRegion, setCurrentRegion] = useState<{latitude: number; longitude: number} | null>(null)

  // function used to close the keyboard when pressing on the screen
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  // function used to update the region state and console logging the current region
  const handleRegionChangeComplete = (region: {latitude: number; longitude: number}) => {
    setCurrentRegion(region)
    console.log("Current region: ", region)
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            style={{ width: 259, height: 48 }}
            source={require('./pictures/safestay1.png')}
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

        <Map onRegionChangeComplete={handleRegionChangeComplete} />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },

  textInputStyle: {
    backgroundColor: '#cee7ed',
    width: '73%'
  },

  imageContainer: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '20%'
  }

});

export default App;
