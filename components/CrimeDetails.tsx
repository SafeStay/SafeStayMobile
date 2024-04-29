import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { CrimeDetailsStyle } from "./styles";
import { CrimeDetail } from "./Interface";

const CrimeDetails: React.FC<{ route: any }> = ({ route }) => {
    const { hotel } = route.params;

    const crimeStats: CrimeDetail[] = [];

    const updateCrimeStats = (crime: CrimeDetail) => {
        const existingCrime = crimeStats.find(c => c.category === crime.category && c.month === crime.month);
        if (existingCrime) {
            existingCrime.count++;
        } else {
            crimeStats.push({ ...crime, count: 1 });
        }
    };

    hotel.crimes.forEach(updateCrimeStats);

    const renderCrimeStats = ({ item }: { item: CrimeDetail}) => (
        <View style={CrimeDetailsStyle.crime}>
            <Text style={CrimeDetailsStyle.crimeText}>Category: {item.category}</Text>
            <Text style={CrimeDetailsStyle.crimeText}>Month: {item.month}</Text>
            <Text style={CrimeDetailsStyle.crimeText}>Count: {item.count}</Text>
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
            <Text style={CrimeDetailsStyle.title}>Crimes total: {hotel.crimesTotal}</Text>
            <Text style={CrimeDetailsStyle.title}>Crime Stats:</Text>
            <FlatList
                data={crimeStats}
                renderItem={renderCrimeStats}
                keyExtractor={(item, index) => `${item.category}-${item.month}`}
            />
        </View>
    );
};

export default CrimeDetails;
