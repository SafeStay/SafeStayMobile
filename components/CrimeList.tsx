import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { Crime, Coordinates } from "./Interface";
import { hotelAndCrimeListStyles } from "./styles";

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
      `https://api.geoapify.com/v1/geocode/search?text=${cityName}&format=json&apiKey=${process.env.EXPO_PUBLIC_GEOAPIKEY}`
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
    <View style={hotelAndCrimeListStyles.container}>
      <View style={hotelAndCrimeListStyles.imageContainer}>
        <Image
          style={{ width: 259, height: 48 }}
          source={require("../pictures/safestay1.png")}
        />
      </View>
      <View style={hotelAndCrimeListStyles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
          <Icon name="navigate-before" size={40} color="#68949e" />
        </TouchableOpacity>
        <View style={hotelAndCrimeListStyles.textInputStyle}>
          <TextInput
            placeholder="Address or location name"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
          />
        </View>
        <Button title="Search" onPress={fetchCoordinates} />
      </View>
      {loading ? (
        <View style={hotelAndCrimeListStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#68949e" />
        </View>
      ) : (
        <View style={hotelAndCrimeListStyles.listStyle}>
          <FlatList
            ItemSeparatorComponent={itemSeparatorStyle}
            data={crimes}
            keyExtractor={(item, index) => item.persistent_id + index}
            renderItem={({ item, index }) => (
              <View style={hotelAndCrimeListStyles.listItemStyle}>
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

export default CrimeList;
