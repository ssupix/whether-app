import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';

// fonts
import { useFonts } from 'expo-font';

// theme
import { ThemeProvider, Text } from '@rneui/themed';
import { theme } from './style/theme';

export default function App() {

  let [fontsLoaded] = useFonts({
    'RethinkSans_Normal': require('./assets/fonts/RethinkSans-VariableFont_wght.ttf'),
    'RethinkSans_Italic': require('./assets/fonts/RethinkSans-Italic-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text h1>whether</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
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
