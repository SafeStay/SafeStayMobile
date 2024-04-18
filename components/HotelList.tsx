import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, FlatList, Image } from "react-native";
import { Coordinates } from "./Interface";
import { hotelListStyles } from "./styles";
import { HotelFS } from "./Interface";

/* Lists all the hotels and shows them on Flatlist */
const HotelList: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [cityName, setCityName] = useState<string>("");

  const [hotels, setHotels] = useState<HotelFS[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${cityName}&format=json&apiKey=${process.env.GEOAPIKEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error in fetch: " + response.statusText);
        }
      })
      .then((data) => {
        const results = data.results[0];
        setCoordinates({ latitude: results.lat, longitude: results.lon });
      })
      .catch((err) => console.log(err));
  };

  const fetchHotels = () => {
    fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${coordinates.longitude},${coordinates.latitude},5000&bias=proximity:${coordinates.longitude},${coordinates.latitude}&limit=20&apiKey=${process.env.GEOAPIKEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch hotels: " + response.statusText);
        }
      })
      .then((data) => {
        setHotels(data.features);
        setLoading(false);
      })

      .catch((err) => console.log("Error in fetching hotels: " + err));
  };

  useEffect(() => {
    fetchHotels();
  }, [coordinates]);

  const itemSeparatorStyle = () => {
    return <View style={{ height: 1, backgroundColor: "grey" }}></View>;
  };

  return (
    <View style={hotelListStyles.container}>
      <View style={hotelListStyles.imageContainer}>
        <Image
          style={{ width: 259, height: 48 }}
          source={require("../pictures/safestay1.png")}
        />
      </View>

      <View style={hotelListStyles.searchContainer}>
        <View style={hotelListStyles.textInputStyle}>
          <TextInput
            placeholder="Address or location name"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
          />
        </View>
        <Button title="Search" onPress={fetchCoordinates} />
      </View>

      <View style={hotelListStyles.listStyle}>
        <FlatList
          ItemSeparatorComponent={itemSeparatorStyle}
          data={hotels}
          renderItem={({ item }) => (
            <View style={hotelListStyles.listItemStyle}>
              <Text style={{ fontSize: 18, marginBottom: 2 }}>{item.name}</Text>
              <Text>{item.address_line2}</Text>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default HotelList;
