import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

type HomeProps = {
    setIsAuth: (b: Boolean) => void
}

export default function Home({ setIsAuth }: HomeProps) {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.loginBtn} onPress={() => setIsAuth(false)}>
                <Text style={styles.loginText}>LOGOUT</Text>
            </TouchableOpacity>

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
