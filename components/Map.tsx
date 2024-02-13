import React from 'react';
import { View } from 'react-native';
import MapView, { Region } from 'react-native-maps';

const Map: React.FC = () => {
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

    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center'
        }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
            >

            </MapView>
        </View>

    );
};

export default Map;
