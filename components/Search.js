import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { data } from '../data/fakeWeather';
import { theme } from '../style/theme';

export default function SearchScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

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

    const renderHiddenItem = ({ item }) => (
        <View style={styles.hiddenItemContainer}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.lightGrey} />
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
            <View style={styles.header}>
                <Text h2>search</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color={theme.colors.grey} />
                <TextInput
                style={styles.searchInput}
                placeholder="search"
                value={searchTerm}
                onChangeText={handleSearch}
                />
            </View>
            <SwipeListView
                data={filteredData}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.grey,
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
    hiddenItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 8,
        paddingTop: 8,
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