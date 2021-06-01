import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';

type ConnexionProps = {
    setIsAuth: (b: Boolean) => void
}

export default function Connexion({ setIsAuth }: ConnexionProps) {

    const [pseudo, setPseudo] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function auth() {

        const rep = await fetch("http://www.teleobjet.fr/Ports/user.php?pseudo=" + pseudo + "&password=" + password);

        if (rep.ok) {
            setIsAuth(true);
        } else {
            setPseudo("");
            setPassword("");
        }

        console.log(rep)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>OilTRACK.</Text>

            <View style={styles.inputView} >
                <TextInput
                    value={pseudo}
                    style={styles.inputText}
                    placeholder="Pseudo"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPseudo(text)} />
            </View>

            <View style={styles.inputView} >
                <TextInput
                    value={password}
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)} />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => auth()}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={styles.subText}>Guest account is pseudo/password</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    subText: {
        color: "#fb5b5a"
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    loginText: {
        color: "white",
        fontSize: 20,

    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});

