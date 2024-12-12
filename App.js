import React, { useState, useEffect } from 'react';
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
import SplashScreen from './components/SplashScreen';

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // loading simulation lol
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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
          {isLoading ? (
            <SplashScreen />
          ) : (
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
                  title: route.params.item.name,
                  headerTitleStyle: {
                    fontFamily: 'RethinkSans_Normal',
                    textTransform: 'lowercase' 
                  },
                  headerStyle: { backgroundColor: '#D0CCC7' },
                  headerTintColor: theme.colors.white,
                })}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;