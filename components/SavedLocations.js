import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from '@rneui/themed';
import { data } from '../data/fakeWeather';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../style/theme';

export default function SavedLocationsScreen() {
    // Filter only saved locations
    const savedLocations = data.filter(item => item.saved);

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, getColorStyle(item.temperature)]}>
            <View style={styles.itemDetails}>
                <Text style={[styles.itemText, getColorStyle(item.temperature)]}>
                    {item.name}
                </Text>
                <Text>
                    {item.type}
                </Text>
            </View>
            <Text style={styles.itemTemp}>
                {item.temperature}°
            </Text>
        </View>
    );

    const getColorStyle = (temperature) => {
        if (temperature < 7) {
            return styles.blue;
        } else if (temperature >= 7 && temperature <= 15) {
            return styles.yellow;
        } else {
            return styles.orange;
        }
    };

    return (
        <View style={styles.container}>
            <Text h1>saved</Text>
            {savedLocations.length > 0 ? (
                <FlatList
                    data={savedLocations}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color={theme.colors.grey} />
                    <Text style={styles.emptyText}>No saved locations yet</Text>
                </View>
            )}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.grey,
        padding: 30,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: theme.colors.lightGrey,
        borderTopWidth: 2,
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        color: theme.colors.lightGrey,
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