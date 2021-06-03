import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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

type price = {
    jour: string,
    sp98: string,
    gazole: string,
    idport: string
};

export default function Home({ setIsAuth }: HomeProps) {


    const [ports, setPorts] = useState<port[]>([]);
    const [filteredList, setFilteredList] = useState<port[]>([]);
    const [prices, setPrices] = useState<{ [id: string]: price }>({});
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        fetch("http://www.teleobjet.fr/Ports/port.php")
            .then(rep => rep.json())
            .then(rep => {
                setPorts(rep);
                setFilteredList(rep)
            })
            .catch(err => console.log(err))

        fetch("http://www.teleobjet.fr/Ports/prix.php")
            .then(rep => rep.json())
            .then(rep => {
                setPrices(rep
                    .sort((a: price, b: price) => {
                        if (a.jour > b.jour) {
                            return 1;
                        }
                        if (a.jour < b.jour) {
                            return -1;
                        }
                        return 0;
                    })
                    .reduce((object: { [id: string]: price }, current: price) => {
                        return { ...object, [current.idport]: current }
                    }, {}));
            })
            .catch(err => console.log(err))
    }, [])

    const renderItem = ({ item: { nom, lat, lon, id } }: { item: port }) => (
        <TouchableOpacity onPress={() => setIsAuth(false)}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={styles.title}>{nom}</Text>
                    <Text style={styles.subTitle}>1.9 km</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.priceText}>SP98 {prices[id]?.sp98} €</Text>
                    <Text style={styles.priceText2}>GZ {prices[id]?.gazole} €</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    console.log(filteredList, prices)

    return (
        <View style={styles.container}>

            <View style={styles.header} >

                <View style={styles.inputView} >
                    <Image
                        style={styles.searchIcon}
                        source={require('../assets/magnifying-glass.png')}
                    />
                    <TextInput
                        inlineImageLeft="search"
                        value={searchText}
                        style={styles.inputText}
                        placeholder="Search..."
                        placeholderTextColor="#fff"
                        onChangeText={text => {
                            setSearchText(text)
                            if (!!text) {
                                setFilteredList(matchSorter(ports, searchText, { keys: ['nom'] }));
                            } else {
                                setFilteredList(ports);
                            }
                        }} />
                </View>

                <TouchableOpacity style={styles.menuButton} onPress={() => setIsAuth(false)}>
                    <Image
                        style={styles.menuIcon}
                        source={require('../assets/menu_white.png')}
                    />
                </TouchableOpacity>

            </View>

            <FlatList
                style={styles.flatList}
                data={filteredList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    menuButton: {

    },

    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12,
        alignItems: "center",
        justifyContent: "space-between"
    },

    flatList: {
        paddingHorizontal: 16,
        width: "100%",
    },

    inputView: {
        maxWidth: 400,
        flexDirection: "row",
        flexGrow: 1,
        marginRight: 16,
        backgroundColor: "#d62a2a",
        borderRadius: 8,
        height: 40,
        alignItems: "center",
        paddingHorizontal: 10,
    },

    inputText: {
        height: 50,
        color: "white"
    },

    menuIcon: {
        width: 26,
        height: 26
    },

    searchIcon: {
        width: 22,
        marginRight: 6,
        height: 22
    },

    item: {
        backgroundColor: '#002e42',
        paddingHorizontal: 16,
        paddingVertical: 8,
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
        fontSize: 18,
        padding: 2,
        borderRadius: 5,
        marginBottom: 5,
        color: "#fff"
    },
    priceText2: {
        border: "1px solid white;",
        width: "100%",
        fontSize: 18,
        padding: 2,
        borderRadius: 5,
        color: "#fff"
    },
    scrollView: {

    }
});