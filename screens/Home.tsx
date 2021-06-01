import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

type HomeProps = {
    setIsAuth: (b: Boolean) => void
}

export default function Home({ setIsAuth }: HomeProps) {


    useEffect(() => {
        fetch("http://www.teleobjet.fr/Ports/port.php")
            .then(rep => rep.json())
            .then(rep => console.log(rep))
            .catch(err => console.log(err))
    }, [])

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.loginBtn} onPress={() => setIsAuth(false)}>
                <Text style={styles.loginText}>SIGN OUT</Text>
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
