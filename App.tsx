import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";
import Map from "./components/Map";

const App: React.FC = () => {



  return (
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

      <Map />
      <StatusBar style="auto" />
    </View>
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
    marginTop: '25%'
  }

});

export default App;
