import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { matchSorter } from 'match-sorter';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import * as Location from 'expo-location';
import { getDistanceFromLatLonInKm, round, kilometersToMiles } from "../functions/helperFunctions";

type HomeProps = {
    setIsAuth: (b: Boolean) => void
}

type port = {
    nom: string,
    lat: string,
    lon: string,
    id: string,
    distanceInKilometers?: number,
    distanceInMiles?: number,
};

type price = {
    jour: string,
    sp98: string,
    gazole: string,
    idport: string
};

export default function Home({ setIsAuth }: HomeProps) {

    const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);
    const [errorLocationMsg, setErrorLocationMsg] = useState<string>("Waiting location...");

    const [openMenu, setOpenMenu] = React.useState(false);
    const [isKilometers, setIsKilometers] = useState<boolean>(true);
    const [isGazole, setIsGazole] = useState<boolean>(false);
    const [ports, setPorts] = useState<port[]>([]);
    const [prices, setPrices] = useState<{ [id: string]: price }>({});
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorLocationMsg('Location fail');
                return;
            } else {
                setErrorLocationMsg('');
            }

            let locationTemp = await Location.getCurrentPositionAsync({});
            setLocation(locationTemp);
        })();

        fetch("http://www.teleobjet.fr/Ports/port.php")
            .then(rep => rep.json())
            .then(rep => setPorts(rep))
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

    const renderItem = ({ item: { nom, id, distanceInKilometers, distanceInMiles } }: { item: port }) => (
        // <TouchableOpacity onPress={() => setIsAuth(false)}>
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.title}>{nom}</Text>
                <Text style={styles.subTitle}>{errorLocationMsg || (isKilometers ? distanceInKilometers + " Kilometers" : distanceInMiles + " Miles")}</Text>
            </View>
            <View style={styles.itemRight}>
                <Text style={styles.priceText}>{isGazole ? "GZ" : "SP98"} {prices[id] && prices[id][isGazole ? "gazole" : "sp98"]} €</Text>
            </View>
        </View>
        // </TouchableOpacity>
    );

    const filteredList: port[] = (searchText ? matchSorter(ports, searchText, { keys: ['nom'] }) : ports).map(port => {
        const distanceInKilometers = (port.lat && port.lon && location?.coords.latitude && location?.coords.longitude) ? round(getDistanceFromLatLonInKm(parseFloat(port.lat), parseFloat(port.lon), location?.coords.latitude || 0, location?.coords.longitude || 0)) : 0;
        return {
            ...port,
            distanceInKilometers,
            distanceInMiles: kilometersToMiles(distanceInKilometers)
        };
    }).sort((a: port, b: port) => {
        if ((a.distanceInKilometers || 0) > (b.distanceInKilometers || 0)) {
            return 1;
        }
        if ((a.distanceInKilometers || 0) < (b.distanceInKilometers || 0)) {
            return -1;
        }
        return 0;
    });

    console.log(filteredList, prices, location)

    return (
        <Provider>
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
                            onChangeText={text => setSearchText(text)} />
                    </View>
                    <Menu
                        visible={openMenu}
                        onDismiss={() => setOpenMenu(false)}
                        anchor={<TouchableOpacity style={styles.menuButton} onPress={() => setOpenMenu(true)}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../assets/menu_white.png')}
                            />
                        </TouchableOpacity>
                        }>
                        <Menu.Item onPress={() => setIsAuth(false)} title="Sign out" />
                        <Divider />
                        <Menu.Item onPress={() => setIsKilometers(is => !is)} title={isKilometers ? "Kilometers" : "Miles"} />
                        <Divider />
                        <Menu.Item onPress={() => setIsGazole(is => !is)} title={isGazole ? "Gazole" : "SP98"} />
                        {/* <Divider />
                        <Menu.Item onPress={() => setIsKilometers(is => !is)} title={"10" + (isKilometers ? " Kilometers" : " Miles")} /> */}
                    </Menu>
                </View>
                <FlatList
                    extraData={[isKilometers, isGazole, filteredList, errorLocationMsg]}
                    style={styles.flatList}
                    data={filteredList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View >
        </Provider>
    );
}

const styles = StyleSheet.create({

    menuButton: {

    },

    container: {
        flex: 1,
        paddingTop: 33,
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
        padding: 12,
        marginTop: 10,
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
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        width: "100%",
        fontSize: 18,
        padding: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 5,
        color: "#fff"
    },
    scrollView: {

    }
});