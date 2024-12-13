import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, ListItem } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { theme } from '../style/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationData, setLocationData] = useState([]);
    const [likedLocations, setLikedLocations] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const apiKey = 'ee849bbc68bf05c148d0718840dcb225';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // Load liked locations on component mount
    useEffect(() => {
        const loadLikedLocations = async () => {
            try {
                const storedLocationsJson = await AsyncStorage.getItem('@likedLocations');
                if (storedLocationsJson) {
                    const currentLikedLocations = JSON.parse(storedLocationsJson);
                    setLikedLocations(currentLikedLocations);
                }
            } catch (error) {
                console.error('Error loading liked locations:', error);
            }
        };

        loadLikedLocations();
    }, []);

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
                id: data.coord.lat, 
                name: data.name,
                temp: `${Math.round(data.main.temp)}`,
                weather: data.weather[0].description,
                windSpeed: data.wind.speed, 
                pressure: data.main.pressure, 
                minTemp: Math.round(data.main.temp_min),
                maxTemp: Math.round(data.main.temp_max),
            };

            setLocationData([newLocationData]); 
            
            // Prevent duplicate entries in history
            const isAlreadyInHistory = history.some(item => item.id === newLocationData.id);
            if (!isAlreadyInHistory) {
                setHistory(prevHistory => [newLocationData, ...prevHistory]);
            }

        } catch (err) {
            setError(err.message);
            setLocationData([]);
        } finally {
            setLoading(false);
        }
    };

    // Favourites
    const handleFavs = async (location) => {
        try {
            // Retrieve current liked locations from AsyncStorage
            const storedLocationsJson = await AsyncStorage.getItem('@likedLocations');
            const currentLikedLocations = storedLocationsJson 
                ? JSON.parse(storedLocationsJson) 
                : [];
    
            // Check if the location already exists in the array
            const locationExists = currentLikedLocations.some(
                (locationItem) => locationItem.id === location.id
            );
    
            let updatedLocations;
            if (locationExists) {
                // If it exists, remove it by filtering it out
                updatedLocations = currentLikedLocations.filter(
                    (locationItem) => locationItem.id !== location.id
                );
            } else {
                // If it doesn't exist, add it to the array
                updatedLocations = [...currentLikedLocations, location];
            }
    
            // Save the updated locations back to AsyncStorage
            await AsyncStorage.setItem(
                '@likedLocations', 
                JSON.stringify(updatedLocations)
            );
    
            setLikedLocations(updatedLocations);
        } catch (error) {
            console.error('Error managing favorite locations:', error);
        }
    };

    const getColorStyle = (temperature) => {
        const temp = parseInt(temperature);
        if (temp < 7) {
            return {colors: ["#4464A9", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        } else if (temp >= 7 && temp <= 15) {
            return {colors: ["#C88F34", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        } else {
            return {colors: ["#C85934", "#BDB6AD"], start: { x: 1, y: 0 }, end: { x: 0.6, y: 0 }};
        }
    };

    const renderItem = ({ item }) => {

        const isLiked = likedLocations.some(
            (likedLocation) => likedLocation.id === item.id
        );

        return (
            <ListItem.Swipeable
                linearGradientProps={getColorStyle(item.temp)}
                ViewComponent={LinearGradient}
                leftWidth={0}
                rightWidth={60}
                minSlideWidth={40}
                style={styles.itemContainer}
                rightContent={() => (
                    <TouchableOpacity 
                        style={styles.hiddenItemContainer}
                        onPress={() => handleFavs(item)}
                    >
                        <Ionicons 
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={24} 
                            color={theme.colors.lightGrey} 
                        />
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
                    placeholder="location"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button
                    onPress={fetchWeather}
                    title="search"
                    color={theme.colors.darkGrey}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.orange} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <SwipeListView
                    data={history}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                    leftActivationValue={100}
                    leftActionValue={0}
                    leftActionActivationValue={100}
                    style={styles.flatList}
                />
            )}
            <View>
                <Text style={styles.swipeText}>swipe left to save!</Text>
            </View>
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
        maxHeight: 30,
        marginTop: 40,
        color: theme.colors.lightGrey
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
    swipeText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
        marginBottom: 30,
        color: theme.colors.darkGrey,
        opacity: 0.5,
        fontFamily: 'RethinkSans_Normal',
    },
    itemContainer: {
        borderColor: theme.colors.lightGrey,
        borderTopWidth: 2,
        borderBottomWidth: 2,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    flatList: {
        marginTop: 10,
    }
});