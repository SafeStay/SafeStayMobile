import React, { useState, useRef } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import mapTemplate from "./map-template";

export default function Map() {
  const webRef = useRef<WebView | null>(null);
  const [mapCenter, setMapCenter] = useState("-121.913, 37.361");

  const onButtonPress = () => {
    const [lng, lat] = mapCenter.split(",");
    if (webRef.current) {
      webRef.current.injectJavaScript(
        `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`
      );
    }
  };

  const handleMapEvent = (event: any) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        />
        <Button title="Set Center" onPress={onButtonPress} />
      </View>
      <WebView
        ref={webRef}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: mapTemplate }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 5,
  },
  map: {
    flex: 1,
  },
});
