import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Fonts
import { useFonts } from 'expo-font';

// Theme
import { ThemeProvider } from '@rneui/themed';
import { theme } from './style/theme';

// Import Screens
import Home from './components/Home';
import Search from './components/Search';
import SavedLocations from './components/SavedLocations';
import Details from './components/Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'cloud-outline';
        } else if (route.name === 'Search') {
          iconName = 'search-outline';
        } else if (route.name === 'SavedLocations') {
          iconName = 'bookmark-outline';
        }
        return <Ionicons name={iconName} size={30} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.orange,
      tabBarInactiveTintColor: theme.colors.darkGrey,
      tabBarStyle: {
        backgroundColor: '#D0CCC7',
        borderTopWidth: 0,
        height: 60,
        paddingTop: 10,
      },
      tabBarShowLabel: false,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="SavedLocations" component={SavedLocations} />
  </Tab.Navigator>
);

// App Component
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
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={({ route }) => ({
                title: route.params.item.name, // Dynamically set the title
                headerStyle: { backgroundColor: theme.colors.lightGrey },
                headerTintColor: theme.colors.white,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;