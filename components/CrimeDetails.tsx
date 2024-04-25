import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { CrimeDetailsStyle } from "./styles";

interface Crime {
    category: string;
    month: string;
}

const CrimeDetails: React.FC<{ route: any }> = ({ route }) => {
    const { hotel } = route.params;

    const renderCrimeItem = ({ item }: { item: Crime }) => (
        <View style={CrimeDetailsStyle.crime}>
            <Text style={CrimeDetailsStyle.crimeText}>Category: {item.category}</Text>
            <Text style={CrimeDetailsStyle.crimeText}>Month: {item.month}</Text>
        </View>
    );

    return (
        <View style={CrimeDetailsStyle.container}>
            <View style={CrimeDetailsStyle.imageContainer}>
                <Image
                    style={{ width: 259, height: 48 }}
                    source={require("../pictures/safestay1.png")}
                />
            </View>
            <Text style={CrimeDetailsStyle.title}>Hotel Name: {hotel.name}</Text>
            <Text style={CrimeDetailsStyle.title}>Ctimes total: {hotel.crimesTotal}</Text>
            <Text style={CrimeDetailsStyle.title}>Crimes:</Text>
            <FlatList
                data={hotel.crimes}
                renderItem={renderCrimeItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default CrimeDetails;
