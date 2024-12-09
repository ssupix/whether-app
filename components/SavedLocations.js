import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { theme } from '../style/theme';
import { weatherQuotes } from '../data/weatherQuotes';

export default function SavedLocationsScreen() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        // Select a random quote on component mount
        const randomQuote = weatherQuotes[Math.floor(Math.random() * weatherQuotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text h2>Saved Locations</Text>
            </View>
            <View>
                <Text style={styles.quote}>{quote}</Text>
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