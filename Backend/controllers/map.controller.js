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
        console.log("distanceTime", distanceTime);
        
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
    const { input } = req.body;
    console.log("input", input);
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        console.log("suggestions", suggestions);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getCoordinatesController,
    getDistanceTimeController,
    getAutoCompleteSuggestionsController
};