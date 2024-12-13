import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, ListItem } from '@rneui/themed';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../style/theme';
import { weatherQuotes } from '../data/weatherQuotes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function SavedLocationsScreen() {
    const [quote, setQuote] = useState('');
    const [likedLocations, setLikedLocations] = useState([]);
    const navigation = useNavigation();

    // Use useFocusEffect to reload locations every time screen comes into focus
    useFocusEffect(
        useCallback(() => {
            const fetchLikedLocations = async () => {
                try {
                    const storedLocationsJson = await AsyncStorage.getItem('@likedLocations');
                    if (storedLocationsJson) {
                        const storedLocations = JSON.parse(storedLocationsJson);
                        setLikedLocations(storedLocations);
                    }
                } catch (error) {
                    console.error('Error fetching liked locations:', error);
                }
            };

            fetchLikedLocations();

            const randomQuote = weatherQuotes[Math.floor(Math.random() * weatherQuotes.length)];
            setQuote(randomQuote);
        }, [])
    );

    const handleFavs = async (location) => {
        try {
            // Retrieve current liked locations from AsyncStorage
            const storedLocationsJson = await AsyncStorage.getItem('@likedLocations');
            const currentLikedLocations = storedLocationsJson 
                ? JSON.parse(storedLocationsJson) 
                : [];
    
            // Filter out the location to remove
            const updatedLocations = currentLikedLocations.filter(
                (locationItem) => locationItem.id !== location.id
            );
    
            // Save the updated locations back to AsyncStorage
            await AsyncStorage.setItem(
                '@likedLocations', 
                JSON.stringify(updatedLocations)
            );
    
            // Update local state
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

    const renderItem = ({ item }) => (
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
                        name="heart" 
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

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text h2>Saved Locations</Text>
            </View>
            <View>
                <Text style={styles.quote}>{quote}</Text>
            </View>
            {likedLocations.length > 0 ? (
                <SwipeListView
                    data={likedLocations}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                    leftActivationValue={100}
                    leftActionValue={0}
                    leftActionActivationValue={100}
                    style={styles.flatList}
                />
            ) : (
                <Text style={styles.emptyText}>No saved locations yet</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 30,
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: theme.colors.grey,
    },
    header: {
        maxHeight: 30,
        marginTop: 40,
    },
    quote: {
        fontSize: 18,
        color: theme.colors.darkGrey,
        opacity: 0.8,
        fontStyle: 'italic',
        marginTop: 20,
        marginBottom: 20,
    },
    itemContainer: {
        borderColor: theme.colors.lightGrey,
        borderTopWidth: 2,
        borderBottomWidth: 0,
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
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: theme.colors.darkGrey,
        fontFamily: 'RethinkSans_Normal',
    },
    flatList: {
        marginTop: 10,
    }
});