import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';

import { Text } from '@rneui/themed';

export default function SavedLocationsScreen() {

    return (
        <View style={styles.container}>
            <Text h1>saved</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
