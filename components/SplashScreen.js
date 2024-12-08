import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../style/theme';

import orange from '../assets/png/orange.png';
import blue from '../assets/png/blue.png';
import { color } from '@rneui/base';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundTop}>
                <Image source={orange} style={styles.image} />
            </View>
            <View style={styles.backgroundBottom}>
                <Image source={blue} style={styles.image} />
            </View>
            <View style={styles.intro}>
                <Text style={styles.title}>Whether</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>its</Text>
                    <Text style={[styles.subtitle, styles.hotText]}>hot</Text>
                    <Text style={styles.subtitle}>or its</Text>
                    <View style={styles.end}>
                        <Text style={[styles.subtitle, styles.coldText]}>cold</Text>
                        <Text style={[styles.subtitle, styles.dot]}>.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundTop: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '10%',
        top: 0,
    },
    backgroundBottom: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        height: '10%',
        bottom: 0,
    },
    image: {
        width: '100%',
    },
    intro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 96,
        fontFamily: 'RethinkSans_Normal',
        textTransform: 'lowercase',
        fontWeight: 'regular',
        letterSpacing: -2.5,
        color: theme.colors.darkGrey,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 24,
        color: theme.colors.darkGrey,
        marginHorizontal: 3,
        fontFamily: 'RethinkSans_Normal',
    },
    hotText: {
        color: theme.colors.orange, 
        fontWeight: 'bold',
    },
    coldText: {
        color: theme.colors.blue,
        fontWeight: 'bold',
    },
    end: {
        flexDirection: 'row',
        marginHorizontal: 0,
    },
    dot: {
        marginHorizontal: 0,
    },
});

export default SplashScreen;