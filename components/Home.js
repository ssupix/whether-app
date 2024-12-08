import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import orange from '../assets/png/orange.png';
import blue from '../assets/png/blue.png';
import yellow from '../assets/png/yellow.png';

import { Text } from '@rneui/themed';
import { theme } from '../style/theme';

export default function HomeScreen() {

    // uncomment this if you want to use the getCircleImage function
    // it only will work with mapped data

    // const getCircleImage = (temperature) => {
    //     if (temperature < 7) {
    //         return blue;
    //     } else if (temperature >= 7 && temperature <= 15) {
    //         return yellow;
    //     } else {
    //         return orange;
    //     }
    // };

    return (
        <View style={styles.main}>

            <View style={styles.circle}>
                {/* <Image source={getCircleImage(item.temperature)} style={styles.image} /> */}
                <Image source={blue} style={styles.image} />
            </View>

            <View style={styles.header}>
                <Text h2>Vancouver</Text>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={30} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {/* you would add the temperature here for background color function to work, I assumed its gon be item.temperature */}
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
                        <Text h3>pressure</Text>
                        <Text style={theme.components.Text.bodyStyle}>1021hPa</Text>
                    </View>
                </View>
                <View style={styles.dataRow}>
                    <View style={styles.data}>
                        <Text h3>coldest</Text>
                        <Text style={theme.components.Text.bodyStyle}>-2°</Text>
                    </View>
                    <View style={styles.data}>
                        <Text h3>hottest</Text>
                        <Text style={theme.components.Text.bodyStyle}>5°</Text>
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
