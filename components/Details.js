import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import orange from '../assets/png/orange.png';
import blue from '../assets/png/blue.png';
import yellow from '../assets/png/yellow.png';

import { Text } from '@rneui/themed';
import { theme } from '../style/theme';

export default function Details({ route }) {
    
    const { item } = route.params;

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

            <View style={styles.circle}>
                <Image source={getCircleImage(item.temp)} style={styles.image} />
            </View>

            <View style={styles.container}>
                <Text h1>{item.temp}°</Text>
                <Text style={styles.description}>its {getDescription(item.temp)} - {item.weather}.</Text>
            </View>
            <View style={styles.dataSection}>
                <View style={styles.dataRow}>
                    <View style={styles.data}>
                        <Text h3>wind speed</Text>
                        <Text style={theme.components.Text.bodyStyle}>{item.windSpeed} m/s</Text>
                    </View>
                    <View style={styles.data}>
                        <Text h3>pressure</Text>
                        <Text style={theme.components.Text.bodyStyle}>{item.pressure} hPa</Text>
                    </View>
                </View>
                <View style={styles.dataRow}>
                    <View style={styles.data}>
                        <Text h3>coldest</Text>
                        <Text style={theme.components.Text.bodyStyle}>{item.minTemp}°C</Text>
                    </View>
                    <View style={styles.data}>
                        <Text h3>hottest</Text>
                        <Text style={theme.components.Text.bodyStyle}>{item.maxTemp}°C</Text>
                    </View>
                </View>
            </View>
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
        height: "60%",
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
