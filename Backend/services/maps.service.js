const axios = require('axios');

const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return {
                success: true,
                coordinates: {
                    latitude: lat,
                    longitude: lng
                }
            };
        } else {
            return {
                success: false,
                error: 'Could not find coordinates for the given address'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

const getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin or destination is missing.')
    }
    const originAddr = await getAddressCoordinate(origin);
    const destinationAddr = await getAddressCoordinate(destination);
    const apiKey = process.env.GOOGLE_MAPS_API;
    
    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    const requestData = {
        origin: { location: { latLng: { latitude: originAddr.coordinates.latitude, longitude: originAddr.coordinates.longitude } } },
        destination: { location: { latLng: { latitude: destinationAddr.coordinates.latitude, longitude: destinationAddr.coordinates.longitude } } },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: { avoidTolls: false, avoidHighways: false, avoidFerries: false },
        languageCode: "en-US",
        units: "METRIC",
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
            },
        });
        
        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                success: true,
                data: {
                    distance: {
                        meters: route.distanceMeters,
                        text: `${(route.distanceMeters / 1000).toFixed(2)} km`
                    },
                    duration: {
                        seconds: parseInt(route.duration.slice(0, -1)),
                        text: `${Math.round(parseInt(route.duration.slice(0, -1)) / 60)} mins`
                    },
                    polyline: route.polyline?.encodedPolyline
                }
            };
        } else {
            return {
                success: false,
                error: 'No routes found'
            };
        }
    } catch(err) {
        console.error('Routes API Error:', err.response?.data || err.message);
        return {
            success: false,
            error: err.response?.data?.error?.message || 'Failed to calculate route'
        };
    }
}

const getAutoCompleteSuggestions = async (input) => {
    try {
        console.log("Input:", input);
        
        if (!input) {
            return { success: false, error: "Query is required" };
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://places.googleapis.com/v1/places:autocomplete`;
        const requestData = {
            input: input,
            languageCode: "en",
            regionCode: "US",
        };

        const response = await axios.post(url, requestData, {
            headers: { 
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.displayName,places.id"
            }
        });
        console.log("Response:", response);

        if (response.data && response.data.places) {
            return {
                success: true,
                suggestions: response.data.suggestions.map(place => ({
                    name: place.displayName.text,
                    placeId: place.id
                }))
            };
        } else {
            return {
                success: false,
                error: "No suggestions found"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
module.exports = {
    getAddressCoordinate,
    getDistanceTime,
    getAutoCompleteSuggestions
};