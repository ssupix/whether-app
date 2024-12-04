import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// fonts
import { useFonts } from 'expo-font';

// theme
import { ThemeProvider, Text } from '@rneui/themed';
import { theme } from './style/theme';

// Import each tab
import Home from './components/Home';
import Search from './components/Search';
import SavedLocations from './components/SavedLocations';
import Details from './components/Details';

const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    'RethinkSans_Normal': require('./assets/fonts/RethinkSans-VariableFont_wght.ttf'),
    'RethinkSans_Italic': require('./assets/fonts/RethinkSans-Italic-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'cloud-outline';
                } else if (route.name === 'Search') {
                  iconName = 'search-outline';
                } else if (route.name === 'SavedLocations') {
                  iconName = 'bookmark-outline';
                }

                // Return the appropriate Ionicons
                return <Ionicons name={iconName} size={30} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.orange,
              tabBarInactiveTintColor: theme.colors.darkGrey,
              headerShown: false, // Optionally hide header for all screens
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: '#D0CCC7',
                borderTopWidth: 0,
                alignItems: 'center',
                paddingTop: 10,
                height: 60,
              },
            })}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="SavedLocations" component={SavedLocations} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
