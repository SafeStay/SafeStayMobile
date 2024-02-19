import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';

// Interface needed for following user on map
interface MapProps {
    onRegionChangeComplete: (region: Region) => void
}

const Map: React.FC<MapProps> = ({onRegionChangeComplete}) => {
    // Set the initial zoom distance
    const desiredDistanceInKm = 5;

    // Calculate latitude delta
    const latitudeDelta = desiredDistanceInKm / 111.32;

    // Calculate longitude delta based on the latitude of the starting point (51.509865)
    const longitudeDelta = desiredDistanceInKm / (111.32 * Math.cos((51.509865 * Math.PI) / 180));

    // Set wanted values in initialRegion
    const initialRegion: Region = {
        latitude: 51.509865,
        longitude: -0.118092,
        latitudeDelta,
        longitudeDelta,
    };

    // function used when the user is done moving on the map
    const handleRegionChangeComplete = (region: Region) => {
        onRegionChangeComplete(region)
    }

    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={initialRegion}
            onRegionChangeComplete={handleRegionChangeComplete}
        >
        </MapView>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        height: '80%',
        width: '90%',
        marginBottom: '13%'
    },
});

export default Map;
