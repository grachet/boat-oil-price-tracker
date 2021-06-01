import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';

type ConnexionProps = {
    setIsAuth: (b: Boolean) => void
}

export default function Connexion({ setIsAuth }: ConnexionProps) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function auth() {
        setIsAuth(!!(email + password));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>OilTRACK.</Text>

            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)} />
            </View>

            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)} />
            </View>

            {/* <TextInput style={styles.input}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                placeholder='Email or Mobile Num'
                placeholderTextColor='rgba(225,225,225,0.7)' />

            <TextInput style={styles.input}
                returnKeyType="go"
                ref={(input) => this.passwordInput = input}
                placeholder='Password'
                placeholderTextColor='rgba(225,225,225,0.7)'
                secureTextEntry /> */}

            <TouchableOpacity style={styles.loginBtn} onPress={() => auth()}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={styles.subText}>Guest account is test/1234</Text>

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

