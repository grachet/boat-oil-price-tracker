import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';

type ConnexionProps = {
    setIsAuth: (b: Boolean) => void
    setIsSignUpScreen: (b: Boolean) => void
}

export default function Connexion({ setIsAuth, setIsSignUpScreen }: ConnexionProps) {

    const [pseudo, setPseudo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("Guest account is pseudo/password");

    async function auth() {




        try {
            const rep = await fetch("http://www.teleobjet.fr/Ports/user.php?pseudo=" + pseudo + "&password=" + password);
            console.log(rep)
            if (rep.ok) {
                setIsAuth(true);
            } else {
                setError("Wrong identifiers (try pseudo/password)")
                setPseudo("");
                setPassword("");
            }
        } catch (error) {
            setPseudo("");
            setPassword("");
            setError(error.message)
        }


    }

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>OilTRACK.</Text>
            <Text style={styles.hint}>{error}</Text>


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
                <Text style={styles.loginText}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={() => setIsSignUpScreen(true)}>
                <Text style={styles.noAccount}>Don't have an account? Create</Text>
            </TouchableOpacity>

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
        marginBottom: 10
    },
    hint: {
        color: "#fb5b5a",
        marginBottom: 30
    },
    noAccount: {
        color: "white",
        fontSize: 16,
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
        marginTop: 30,
        marginBottom: 10
    },
    signInButton: {
        width: "80%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    }
});

