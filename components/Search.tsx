import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { searchPageStyles } from "./styles";

type SearchProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Search: React.FC<SearchProps> = ({ navigation }) => {
  return (
    <View style={searchPageStyles.container}>
      <View style={searchPageStyles.imageContainer}>
        <Image
          style={{ width: 259, height: 48 }}
          source={require("../pictures/safestay1.png")}
        />
      </View>
      <View style={searchPageStyles.buttonContainer}>
        <TouchableOpacity style={searchPageStyles.button} onPress={() => navigation.navigate("HotelList")}>
          <Text style={searchPageStyles.buttonTitle}>Hotel List</Text>
          <Text style={searchPageStyles.buttonDescription}>Look up 20 nearest hotels and view their crime rates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={searchPageStyles.button} onPress={() => navigation.navigate("CrimeList")}>
          <Text style={searchPageStyles.buttonTitle}>Crime List</Text>
          <Text style={searchPageStyles.buttonDescription}>Search for all crimes within a mile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
