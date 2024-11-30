import { StyleSheet, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import orange from '../assets/png/orange.png';
import blue from '../assets/png/blue.png';
import yellow from '../assets/png/yellow.png';

import { Text } from '@rneui/themed';
import { theme } from '../style/theme';

export default function HomeScreen() {

    return (
        <View style={styles.main}>

            <View style={styles.circle}>
                <Image source={orange} style={styles.image} />
            </View>

            <View style={styles.header}>
                <Text h2>Vancouver</Text>
                <Ionicons name="heart-outline" size={30} color="white"/>
            </View>
            <View style={styles.container}>
                <Text h1>5°</Text>
                <Text style={styles.description}>its cold and its raining.</Text>
            </View>
            <View style={styles.dataSection}>
                <View style={styles.dataRow}>
                    <View style={styles.data}>
                        <Text h3>wind speed</Text>
                        <Text style={theme.components.Text.bodyStyle}>17km/h</Text>
                    </View>
                    <View style={styles.data}>
                        <Text h3>wind speed</Text>
                        <Text style={theme.components.Text.bodyStyle}>17km/h</Text>
                    </View>
                </View>
                <View style={styles.dataRow}>
                    <View style={styles.data}>
                        <Text h3>wind speed</Text>
                        <Text style={theme.components.Text.bodyStyle}>17km/h</Text>
                    </View>
                    <View style={styles.data}>
                        <Text h3>wind speed</Text>
                        <Text style={theme.components.Text.bodyStyle}>17km/h</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: theme.colors.grey,
        padding: 30,
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
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        tintColor: '#F5F1F0',
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        width: "110%",
        justifyContent: 'center',
        alignItems: 'center',   
        flex: 1,
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
        justifyContent: 'end',
        gap: 0,
    },
    dataRow: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    data: {
        flex: 1,
        alignItems: 'flex-start',
    },
});
