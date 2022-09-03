import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  // console.log(location);
  // console.log(
  //   `data ${location?.coords.latitude ?? 0} + "longitude" +  ${
  //     location?.coords.longitude ?? 0
  //   }`
  // );
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          onMagicTap={() => {
            console.log("magic tap");
          }}
          onTouchMove={(e) => {
            console.log("touch move", e.location);
          }}
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
