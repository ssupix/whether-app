import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Text, ListItem } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
// import { data } from '../data/fakeWeather';
import { theme } from '../style/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';

export default function SearchScreen() {
    // const [filteredData, setFilteredData] = useState(data);

    const [searchQuery, setSearchQuery] = useState('');
    const [locationData, setLocationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const apiKey = 'ee849bbc68bf05c148d0718840dcb225';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const fetchWeather = async () => {
        if (!searchQuery) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}?q=${searchQuery}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();

            const newLocationData = {
                id: data.coord.lat, // Use latitude coordinates as a unique ID
                name: data.name,
                temp: `${Math.round(data.main.temp)}`, // Temperature is rounded to the nearest integer in Celsius
                weather: data.weather[0].description, // Weather description
            };

            setLocationData([newLocationData]); // Update the location data array with the new data
        } catch (err) {
            setError(err.message);
            setLocationData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length < 1) {
            fetchWeather();
        }
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        
            <ListItem.Swipeable
                linearGradientProps={
                    getColorStyle(item.temp)
                }
                ViewComponent={LinearGradient}
                leftWidth={0}
                rightWidth={60}
                minSlideWidth={40}
                style={styles.itemContainer}
                rightContent={() => (
                    <TouchableOpacity style={styles.hiddenItemContainer}>
                        <Ionicons name="heart-outline" size={24} color={theme.colors.lightGrey} />
                    </TouchableOpacity>
                )}
            >
                <TouchableOpacity 
                    style={styles.itemContent}
                    onPress={() => navigation.navigate('Details', { item })}
                >
                <ListItem.Content style={styles.itemDetails}>
                    <ListItem.Title style={styles.itemText}>
                        {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {item.weather}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Text style={styles.itemTemp}>
                    {item.temp}°C
                </Text>
                </TouchableOpacity>
            </ListItem.Swipeable>
    );

    const getColorStyle = (temperature) => {
        if (temperature < 7) {
        return {colors: ["#4464A9", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        } else if (temperature >= 7 && temperature <= 15) {
        return {colors: ["#C88F34", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        } else {
        return {colors: ["#C85934", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text h2>search</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color={theme.colors.grey} />
                <TextInput
                style={styles.searchInput}
                placeholder="search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                />
                <Button
                onPress={fetchWeather}
                title="search"
                />
            </View>
            <SwipeListView
                data={locationData}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                leftActivationValue={100}
                leftActionValue={0}
                leftActionActivationValue={100}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: theme.colors.grey,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 30,
        marginTop: 40,
        color: '#F5F1F0'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'RethinkSans_Normal',
        marginLeft: 8,
    },
    itemContainer: {
        borderTopColor: theme.colors.lightGrey,
        borderTopWidth: 2,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemText: {
        fontSize: 20,
        fontFamily: 'RethinkSans_Normal',
        textTransform: 'lowercase',
    },
    itemTemp: {
        fontSize: 24,
        color: theme.colors.lightGrey,
        fontFamily: 'RethinkSans_Normal',
        textTransform: 'lowercase',
    },
    hiddenItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    blue: {
        backgroundColor: theme.colors.blue,
    },
    yellow: {
        backgroundColor: theme.colors.yellow,
    },
    orange: {
        backgroundColor: theme.colors.orange,
    },
});