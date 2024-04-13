import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Hotel } from "./HotelList";

interface MapProps {
  hotels: Hotel[];
}

const Map: React.FC<MapProps> = ({ hotels }) => {
  // Set the initial zoom distance
  const desiredDistanceInKm = 4;

  // Calculate latitude delta
  const latitudeDelta = desiredDistanceInKm / 111.32;

  // Calculate longitude delta based on the latitude of the starting point (51.509865)
  const longitudeDelta =
    desiredDistanceInKm / (111.32 * Math.cos((51.509865 * Math.PI) / 180));

  // Set wanted values in initialRegion
  const initialRegion: Region = {
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta,
    longitudeDelta,
  };


  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={initialRegion} >

      {/* Mapping through the hotels and showing their locations and crime counts */}
      {hotels.map((hotel, index) => {
        let markerColor = "green";

        // Determine marker color based on crimesTotal value
        if (hotel.crimesTotal) {
          if (hotel.crimesTotal >= 3 && hotel.crimesTotal <= 7) {
            markerColor = "yellow";
          } else if (hotel.crimesTotal > 8) {
            markerColor = "red";
          }
        }

        return (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(hotel.lat),
              longitude: parseFloat(hotel.lon),
            }}
            title={hotel.name}
            pinColor={markerColor}
            description={`${hotel.street}. Crimes within a mile: ${hotel.crimesTotal}`}
          />
        );
      })}
    </MapView>
  );

};

const styles = StyleSheet.create({
  mapStyle: {
    height: "80%",
    width: "90%",
    marginBottom: "5%",
  },
});

export default Map;
