import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";

interface Crime {
  id: string;
  category: string;
  location: {
    latitude: string;
    street: {
      name: string;
    };
    longitude: string;
  };
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

type SearchProps = {
  navigation: NativeStackNavigationProp<any>;
};

const CrimeList: React.FC<SearchProps> = ({ navigation }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [cityName, setCityName] = useState<string>("");
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = () => {
    setLoading(true);
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${cityName}&format=json&apiKey=${process.env.GEOAPIKEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error in fetchCoordinates: " + response.statusText);
        }
      })
      .then((data) => {
        const results = data.results[0];
        setCoordinates({ latitude: results.lat, longitude: results.lon });
      })
      .catch((err) => console.log("Error in fetchCoordinates:", err));
  };

  const fetchCrimes = () => {
    const policeApiUrl = `https://data.police.uk/api/crimes-street/all-crime?lat=${coordinates.latitude}&lng=${coordinates.longitude}`;

    fetch(policeApiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch crimes: " + response.statusText);
        }
      })
      .then((data) => {
        setCrimes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetchCrimes: " + err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCrimes();
  }, [coordinates]);

  const itemSeparatorStyle = () => {
    return <View style={{ height: 1, backgroundColor: "grey" }}></View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 259, height: 48 }}
          source={require("../pictures/safestay1.png")}
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
          <Icon name="navigate-before" size={40} color="#68949e" />
        </TouchableOpacity>
        <View style={styles.textInputStyle}>
          <TextInput
            placeholder="Address or location name"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
          />
        </View>
        <Button title="Search" onPress={fetchCoordinates} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#68949e" />
        </View>
      ) : (
        <View style={styles.listStyle}>
          <FlatList
            ItemSeparatorComponent={itemSeparatorStyle}
            data={crimes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItemStyle}>
                <Text style={{ fontSize: 18, marginBottom: 2 }}>
                  Category: {item.category}
                </Text>
                <Text>Street: {item.location.street.name}</Text>
              </View>
            )}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "14%",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: "3%",
  },
  textInputStyle: {
    backgroundColor: "#cee7ed",
    width: "70%",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    flex: 5,
    width: "90%",
  },
  listItemStyle: {
    padding: 15,
  },
});

export default CrimeList;
