const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

const registerCaptainController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashPassword = await captainModel.hashPassword(password);
    const { color, plate, capacity, vehicleType } = vehicle;
    try {
        const captain = await captainService.createCaptain({
            firstname,
            lastname,
            email,
            password: hashPassword,
            color,
            plate,
            capacity,
            vehicleType
        });
        const token = captain.generateToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { registerCaptainController };