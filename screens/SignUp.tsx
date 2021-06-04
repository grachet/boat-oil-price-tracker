import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

type ConnexionProps = {
    setIsAuth: (b: Boolean) => void
    setIsSignUpScreen: (b: Boolean) => void
}



export default function SignUp({ setIsAuth, setIsSignUpScreen }: ConnexionProps) {

    const [pseudo, setPseudo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function signUp() {

        let fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");
        fetchHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "pseudo": pseudo,
            "mailadr": mail,
            "password": password
        });

        const requestOptions = {
            method: 'PUT',
            headers: fetchHeaders,
            body: raw
        };

        try {
            const rep = await fetch("http://www.teleobjet.fr/Ports/user.php", requestOptions);
            console.log(rep)
            if (rep.ok) {
                setIsSignUpScreen(false);
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Sign Up.</Text>
            <Text style={styles.hint}>{error}</Text>


            <View style={styles.inputView} >
                <TextInput
                    value={mail}
                    style={styles.inputText}
                    placeholder="Mail"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setMail(text)} />
            </View>

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
                    secureTextEntry={true}
                    value={password}
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)} />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => signUp()}>
                <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={() => setIsSignUpScreen(false)}>
                <Text style={styles.noAccount}>Already have an account? Log In</Text>
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

