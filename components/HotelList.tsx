import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, TextInput, View, FlatList, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/themed';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Hotel {
  properties: {
    name: string;
    address_line2: string;
    datasource: {
      raw: {
        website: string
      }
    }
  };
}

type SearchProps = {
  navigation: NativeStackNavigationProp<any>;
};

//const API_KEY = process.env.EXPO_PUBLIC_API_KEY_HOTELS;

const API_KEY = '83303dece118432fb31034960fd3db2d';

const HotelList: React.FC<SearchProps> = ({ navigation }) => {

  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  const [cityName, setCityName] = useState<string>('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = () => {
    setLoading(true)
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${cityName}&format=json&apiKey=${API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error in fetch: ' + response.statusText);
        }
      })
      .then(data => {
        const results = data.results[0];
        setCoordinates({ latitude: results.lat, longitude: results.lon });
      })
      .catch(err => console.log(err))
  }

  const fetchHotels = () => {
    fetch(`https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${coordinates.longitude},${coordinates.latitude},5000&bias=proximity:${coordinates.longitude},${coordinates.latitude}&limit=20&apiKey=${API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch hotels: ' + response.statusText);
        }
      })
      .then(data => {
        setHotels(data.features);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error in fetching hotels: ' + err);
        setLoading(false)
      });

  };

  useEffect(() => {
    fetchHotels();
  }, [coordinates])

  const itemSeparatorStyle = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: 'grey' }}>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 259, height: 48 }}
          source={require('../pictures/safestay1.png')}
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
          <Icon name="navigate-before" size={40} color="#68949e" />
        </TouchableOpacity>
        <View style={styles.textInputStyle}>
          <TextInput
            placeholder='Address or location name'
            value={cityName}
            onChangeText={text => setCityName(text)}
          />
        </View>
        <Button
          title='Search'
          onPress={fetchCoordinates}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#68949e" />
        </View>
      ) : (
        <View style={styles.listStyle}>
          <FlatList
            ItemSeparatorComponent={itemSeparatorStyle}
            data={hotels}
            renderItem={({ item }) => (
              <View style={styles.listItemStyle}>
                <Text style={{ fontSize: 18, marginBottom: 2 }}>{item.properties.name}</Text>
                <Text>{item.properties.address_line2}</Text>
                {item.properties.datasource.raw.website ? (
                  <TouchableOpacity onPress={() => Linking.openURL(item.properties.datasource.raw.website)}>
                    <Text style={{ color: 'blue' }}>Book on the official website</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => Linking.openURL(`https://www.booking.com/searchresults.fi.html?ss=${((item.properties.name) + "hotellondonunitedkingdom").toLowerCase().replace(/\s+/g, '')}`)}>
                    <Text style={{ color: 'blue' }}>Book on Booking.com</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '14%'
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: '3%'
  },
  textInputStyle: {
    backgroundColor: '#cee7ed',
    width: '70%',
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    flex: 5,
    width: '90%',
  },
  listItemStyle: {
    padding: 15
  }
});

export default HotelList;