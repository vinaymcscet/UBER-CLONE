const axios = require('axios');
const captainModel = require('../models/captain.model');

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
    console.log("originAddr", originAddr);
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
        if (!input) {
            return { success: false, error: "Query is required" };
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = 'https://places.googleapis.com/v1/places:searchText';

        const response = await axios.post(url, {
            textQuery: input,
            languageCode: "en",
            // locationBias: {
            //     rectangle: {
            //         low: { latitude: 8.4, longitude: 68.7 },
            //         high: { latitude: 37.6, longitude: 97.25 }
            //     }
            // },
            // maxResultCount: 5
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.plusCode,places.addressComponents'
            }
        });

        if (response.data && response.data.places) {
            return {
                success: true,
                predictions: response.data.places.map(place => ({
                    placeId: place.id,
                    description: place.formattedAddress,
                    mainText: place.displayName.text,
                    secondaryText: place.addressComponents?.[0]?.shortText || '',
                    referenceId: place.plusCode?.globalCode || '',
                    location: place.location,
                    terms: place.addressComponents?.map(component => ({
                        offset: component.startIndex || 0,
                        value: component.shortText || component.text
                    })) || [],
                    types: place.types || []
                }))
            };
        } else {
            return {
                success: false,
                error: 'No places found'
            };
        }
    } catch (error) {
        console.error('Places API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Failed to get suggestions'
        };
    }
};

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    try {
        // Validate inputs
        if (!ltd || !lng || !radius) {
            throw new Error('Latitude, longitude and radius are required');
        }

        const latitude = parseFloat(ltd);
        const longitude = parseFloat(lng);
        const radiusInKm = parseFloat(radius);

        // Validate parsed values
        if (isNaN(latitude) || isNaN(longitude) || isNaN(radiusInKm)) {
            throw new Error('Invalid coordinates or radius format');
        }

        console.log('Searching with params:', {
            latitude,
            longitude,
            radiusInKm,
            query: {
                location: {
                    $geoWithin: {
                        $centerSphere: [[longitude, latitude], radiusInKm / 6371]
                    }
                }
            }
        });

        // Find available captains only
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radiusInKm / 6371]
                }
            }
        }).exec();

        console.log(`Found ${captains.length} captains within ${radiusInKm}km radius`);
        
        return captains;
    } catch (error) {
        console.error('getCaptainsInTheRadius error:', error);
        throw error;
    }
}

module.exports = {
    getAddressCoordinate,
    getDistanceTime,
    getAutoCompleteSuggestions,
    getCaptainsInTheRadius
};