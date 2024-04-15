import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import { Coordinates } from "./Interface";
import { hotelListStyles } from "./styles";
import { Hotel } from "./Interface";
import fetchHotelDataFromFirestore from "./HotelMap";
import { getDistance } from "geolib";

const API_KEY = "83303dece118432fb31034960fd3db2d";

/* Lists all the hotels and shows them on Flatlist */
const HotelList: React.FC<{ navigation: any }> = ({ navigation }) => {

  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [location, setLocation] = useState<string>("");
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchCoordinates = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${location}+london+uk&format=json&apiKey=${API_KEY}`
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

  useEffect(() => {
    if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
      fetchHotelDataFromFirestore()
        .then((data) => {
          const distances = data.map((hotel) => (
            getDistance(
              { latitude: coordinates.latitude, longitude: coordinates.longitude },
              { latitude: hotel.lat, longitude: hotel.lon }
            )
          ));

          const hotelIndexes = Array.from(Array(data.length).keys());
          const validHotelIndexes = hotelIndexes.filter(index => !isNaN(distances[index]));
          const sortedHotelsByDistance = validHotelIndexes
            .sort((indexA, indexB) => distances[indexA] - distances[indexB])
            .slice(0, 20)
            .map(index => data[index]);
          const sortedHotelsByCrimes = sortedHotelsByDistance.sort((hotelA, hotelB) => {
            const aCrimesTotal = hotelA.crimesTotal;
            const bCrimesTotal = hotelB.crimesTotal;
            if (aCrimesTotal !== undefined && bCrimesTotal !== undefined) {
              return aCrimesTotal - bCrimesTotal;
            } else {
              return 0;
            }
          });

          setHotels(sortedHotelsByCrimes);
        })
        .catch((error) => console.error("Error fetching hotels:", error));
    }
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
            value={location}
            onChangeText={(text) => setLocation(text)}
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
              {item.website !== "" ? (
                <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
                  <Text style={{ color: 'blue' }}>Book on the official website</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.booking.com/searchresults.fi.html?ss=${((item.name) + "hotellondon").toLowerCase().replace(/\s+/g, '')}`)}>
                  <Text style={{ color: 'blue' }}>Book on Booking.com</Text>
                </TouchableOpacity>
              )}
              <View style={{ alignSelf: 'flex-end' }}>
                {/* Lisää nappi, joka navigoi CrimeDetails-näkymään ja välittää hotellin tiedot */}
                <Button
                  title="Crime Details"
                  onPress={() => navigation.navigate("CrimeDetails", { hotel: item })}
                  color="black"
                />
              </View>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default HotelList;
