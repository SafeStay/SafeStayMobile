import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SearchProps = {
    navigation: NativeStackNavigationProp<any>;
};

const Search: React.FC<SearchProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={{ width: 259, height: 48 }}
                    source={require('../pictures/safestay1.png')}
                />
            </View>
            <View style={styles.buttons}>
                <Button
                    title="Hotel List"
                    onPress={() => navigation.navigate('HotelList')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '14%'
    },
    buttons: {
        flex: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default Search;