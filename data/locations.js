const newLocation = {
    id: Date.now(), // Unique identifier
    name: response.data.name,
    temperature: response.data.temperature,
    weatherCondition: response.data.weather,
    // Add any other relevant data from the API
};