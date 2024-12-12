import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from '@rneui/themed';
import { theme } from '../style/theme';
import { weatherQuotes } from '../data/weatherQuotes';

export default function SavedLocationsScreen({ route }) {
    const [quote, setQuote] = useState('');
    // const { likedLocations } = route.params; // Receive liked locations
    // const { item } = route.params; // Receive location data
    const [updatedLocations, setUpdatedLocations] = useState([]);

    const apiKey = 'ee849bbc68bf05c148d0718840dcb225';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // React.useEffect(() => {
    //     if (route.params?.newLocation) {
    //       // Add to your array
    //     setLikedLocations(prev => [...prev, route.params.newLocation]);
    // }
    // }, [route.params?.newLocation]);
    
    // useEffect(() => {
    //     const fetchWeatherForFavorites = async () => {
    //         const fetchedData = await Promise.all(
    //             likedLocations.map(async (location) => {
    //                 try {
    //                     const response = await fetch(`${apiUrl}?q=${location.name}&appid=${apiKey}&units=metric`);
    //                     const data = await response.json();
    //                     return {
    //                         id: data.coord.lat,
    //                         name: data.name,
    //                         temp: Math.round(data.main.temp),
    //                         weather: data.weather[0].description,
    //                     };
    //                 } catch {
    //                     return location; // If fetch fails, keep existing data
    //                 }
    //             })
    //         );
    //         setUpdatedLocations(fetchedData);
    //     };

    //     fetchWeatherForFavorites();
    // }, [likedLocations]);

// Function to retrieve liked locations (use in another screen)
const getLikedLocations = async () => {
    try {
        const storedLocationsJson = await AsyncStorage.getItem('@likedLocations');
        return storedLocationsJson ? JSON.parse(storedLocationsJson) : [];
    } catch (error) {
        console.error('Error retrieving liked locations:', error);
        return [];
    }
};

    useEffect(() => {
        // Select a random quote on component mount
        const randomQuote = weatherQuotes[Math.floor(Math.random() * weatherQuotes.length)];
        setQuote(randomQuote);
    }, []);

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
                <TouchableOpacity 
                    style={styles.hiddenItemContainer}
                    onPress={() => handleFavs(item)}
                >
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

    return (
        <View style={styles.container}>
            <Text h2>Favorites</Text>
            <FlatList
                data={updatedLocations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );

    // return (
    //     <View style={styles.main}>
    //         <View style={styles.header}>
    //             <Text h2>Saved Locations</Text>
    //         </View>
    //         <View>
    //             <Text style={styles.quote}>{quote}</Text>
    //         </View>
    //     </View>
    // );
}

const styles = StyleSheet.create({
    main: {
        padding: 30,
        flex: 1,
        backgroundColor: theme.colors.grey,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 30,
        marginTop: 40,
    },
    quote: {
        fontSize: 18,
        color: theme.colors.darkGrey,
        opacity: 0.8,
        fontStyle: 'italic',
        marginTop: 20,
    },
});