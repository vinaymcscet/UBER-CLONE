const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

const getCoordinatesController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found.' });
    }
};

const getDistanceTimeController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAutoCompleteSuggestionsController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { input } = req.query;
    
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        
        if (!suggestions.success) {
            return res.status(400).json(suggestions);
        }
        
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Places API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch place suggestions'
        });
    }
}

module.exports = {
    getCoordinatesController,
    getDistanceTimeController,
    getAutoCompleteSuggestionsController
};