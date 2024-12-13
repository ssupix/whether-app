import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import orange from '../assets/png/orange.png';
import blue from '../assets/png/blue.png';
import yellow from '../assets/png/yellow.png';

import { Text } from '@rneui/themed';
import { theme } from '../style/theme';

export default function HomeScreen() {

    const [weatherData, setWeatherData] = useState([null]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'ee849bbc68bf05c148d0718840dcb225';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}?q=Vancouver&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();

            setWeatherData({
                temp: `${Math.round(data.main.temp)}`, // Temperature is rounded to the nearest integer in Celsius
                weather: data.weather[0].description, // Weather description
                windSpeed: data.wind.speed, // Wind speed
                pressure: data.main.pressure, // Pressure
                minTemp: Math.round(data.main.temp_min), // Minimum temperature
                maxTemp: Math.round(data.main.temp_max), // Maximum temperature
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [])

    // uncomment this if you want to use the getCircleImage function
    // it only will work with mapped data

    const getCircleImage = (temp) => {
        if (temp < 7) {
            return blue;
        } else if (temp >= 7 && temp <= 15) {
            return yellow;
        } else {
            return orange;
        }
    };

    const getDescription = (temp) => {
        if (temp < 7) {
            return 'cold';
        } else if (temp >= 7 && temp <= 15) {
            return 'warm';
        } else {
            return 'hot';
        }
    };

    return (
        <View style={styles.main}>
            {loading && <Text style={styles.header}>Loading...</Text>}
            {error && <Text style={styles.header}>Error: {error}</Text>}
            {weatherData && (
                <>
                    <View style={styles.circle}>
                        <Image source={getCircleImage(weatherData.temp)} style={styles.image} />
                    </View>

                    <View style={styles.header}>
                        <Text h2>Vancouver</Text>
                    </View>
                    <View style={styles.container}>
                        <Text h1>{weatherData.temp}°C</Text>
                        <Text style={styles.description}>its {getDescription(weatherData.temp)} - {weatherData.weather}.</Text>
                    </View>
                    <View style={styles.dataSection}>
                        <View style={styles.dataRow}>
                            <View style={styles.data}>
                                <Text h3>wind speed</Text>
                                <Text style={theme.components.Text.bodyStyle}>{weatherData.windSpeed} m/s</Text>
                            </View>
                            <View style={styles.data}>
                                <Text h3>pressure</Text>
                                <Text style={theme.components.Text.bodyStyle}>{weatherData.pressure} hPa</Text>
                            </View>
                        </View>
                        <View style={styles.dataRow}>
                            <View style={styles.data}>
                                <Text h3>coldest</Text>
                                <Text style={theme.components.Text.bodyStyle}>{weatherData.minTemp}°C</Text>
                            </View>
                            <View style={styles.data}>
                                <Text h3>hottest</Text>
                                <Text style={theme.components.Text.bodyStyle}>{weatherData.maxTemp}°C</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 30,
        flex: 1,
        backgroundColor: theme.colors.grey,
    },
    image: {
        width: 100,
        height: 100,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 30,
        marginTop: 40,
        color: '#F5F1F0'
    },
    container: {
        position: 'relative',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        textAlign: 'center',
        tintColor: '#F5F1F0',
    },
    circle: {
        position: 'absolute',
        width: "110%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    image: {
        width: 500,
    },
    description: {
        color: '#F5F1F0',
        fontSize: 20,
        fontFamily: 'RethinkSans_Normal',
        textTransform: 'lowercase',
        fontWeight: 'regular',
        letterSpacing: -.8,
    },
    dataSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 0,
        paddingBottom: 40,
    },
    dataRow: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        maxHeight: 100,
    },
    data: {
        flex: 1,
        alignItems: 'flex-start',
    },
});
