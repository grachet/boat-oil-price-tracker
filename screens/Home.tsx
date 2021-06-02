import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { matchSorter } from 'match-sorter'

type HomeProps = {
    setIsAuth: (b: Boolean) => void
}

type port = {
    nom: string,
    lat: string,
    lon: string,
    id: string
};

export default function Home({ setIsAuth }: HomeProps) {


    const [ports, setPorts] = useState<port[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        fetch("http://www.teleobjet.fr/Ports/port.php")
            .then(rep => rep.json())
            .then(rep => {
                setPorts([...rep, ...rep, ...rep, ...rep, ...rep]);
                console.log(rep);
            })
            .catch(err => console.log(err))
    }, [])

    const renderItem = ({ item: { nom, lat, lon } }: { item: port }) => (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.title}>{nom}</Text>
                <Text style={styles.subTitle}>1.9 km</Text>
            </View>
            <View style={styles.itemRight}>
                <Text style={styles.priceText}>3.2 €</Text>
            </View>
        </View>
    );

    const filteredList = !!searchText ? matchSorter(ports, searchText, { keys: ['nom'] }) : ports;

    console.log(filteredList)

    return (
        <View style={styles.container}>

            <View style={styles.header} >

                <View style={styles.inputView} >
                    <TextInput
                        icon={'../assets/magnifier.png'}
                        value={searchText}
                        style={styles.inputText}
                        placeholder="Search..."
                        placeholderTextColor="#fff"
                        onChangeText={text => setSearchText(text)} />
                </View>

                <TouchableOpacity style={styles.menuButton} onPress={() => setIsAuth(false)}>
                    <Text >SIGN OUT</Text>
                </TouchableOpacity>

            </View>

            <ScrollView style={styles.scrollView}>
                <FlatList
                    ListHeaderComponent={() => }
                    data={filteredList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    menuButton: {

    },

    container: {
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        flexDirection: "row",
        paddingHorizontal: 14,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12
    },

    inputView: {
        width: "70%",
        backgroundColor: "#d62a2a",
        borderRadius: 8,
        height: 36,
        justifyContent: "center",
        paddingHorizontal: 10,
    },

    inputText: {
        height: 50,
        color: "white"
    },

    searchIcon: {
        width: 20,
        height: 20
    },

    item: {
        backgroundColor: '#002e42',
        padding: 12,
        marginVertical: 5,
        borderRadius: 10,
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 18,
        color: "#fff"
    },
    subTitle: {
        fontSize: 15,
        color: "#fff"
    },
    itemLeft: {
        flexGrow: 1,
        marginRight: 10,
    },
    itemRight: {
    },
    priceText: {
        border: "1px solid white;",
        width: "100%",
        fontSize: 22,
        padding: 4,
        borderRadius: 10,
        color: "#fff"
    },
    scrollView: {

    }
});