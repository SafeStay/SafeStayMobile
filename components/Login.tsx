import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Username:", username);
        console.log("Password:", password);
    };

    const handleSignUp = () => {
        console.log("Sign up");
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../pictures/safestay1.png')}
            />
            <Text style={styles.text}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Log in"
                    onPress={handleLogin}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Sign up"
                    onPress={handleSignUp}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    logo: {
        width: 259,
        height: 48,
        position: 'absolute',
        top: 50,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSpacer: {
        width: 10,
    },
});

export default Login;
