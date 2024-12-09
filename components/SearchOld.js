export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationData, setLocationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'ee849bbc68bf05c148d0718840dcb225';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const fetchWeather = async () => {
        if (!searchQuery) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}?q=${searchQuery}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();

            const newLocationData = {
                id: data.coord.lat, // Use latitude coordinates as a unique ID
                name: data.name,
                temp: `${Math.round(data.main.temp)}°C`, // Temperature is rounded to the nearest integer in Celsius
                weather: data.weather[0].description, // Weather description
            };

            setLocationData([newLocationData]); // Update the location data array with the new data
        } catch (err) {
            setError(err.message);
            setLocationData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 2) {
            fetchWeather();
        }
    }, [searchQuery]);

    const renderLocationItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Location: {item.name}</Text>
            <Text style={styles.itemText}>Weather: {item.weather}</Text>
            <Text style={styles.itemText}>Temperature: {item.temp}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Search Weather</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="gray" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter a location"
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                data={locationData}
                renderItem={renderLocationItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={!loading && <Text>No results found</Text>}
            />
        </View>
    );
}