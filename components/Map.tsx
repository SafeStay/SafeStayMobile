// Map.tsx
import React, { forwardRef, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Crime } from "./CrimeFetch";

interface MapProps {
  initialRegion: Region;
  crimes: Crime[];
  onRegionChangeComplete: (region: Region) => void;
}

const Map: React.ForwardRefRenderFunction<MapView, MapProps> = ({ initialRegion, crimes, onRegionChangeComplete }, ref) => {
  const [region, setRegion] = useState<Region>(initialRegion);

  useEffect(() => {
    setRegion(initialRegion);
  }, [initialRegion]);

  return (
    <MapView
      ref={ref}
      style={styles.mapStyle}
      initialRegion={initialRegion}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {crimes.map((crime, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(crime.location.latitude),
            longitude: parseFloat(crime.location.longitude),
          }}
          title={crime.category}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    width: "100%",
  },
});

export default forwardRef(Map);
