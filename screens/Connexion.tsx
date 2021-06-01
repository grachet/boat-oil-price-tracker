import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type ConnexionProps = {
    setIsAuth: (b: Boolean) => void
}

export default function Connexion({ setIsAuth }: ConnexionProps) {
    return (
        <View style={styles.container}>
            <Text>Connexion</Text>
            <Button title="Connexion" onPress={() => setIsAuth(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

