const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const { authUser } = require("../middlewares/auth.middleware");
const rideController = require('../controllers/ride.controller');

router.post('/create', 
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    rideController.createRideController
);

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    rideController.getFareController
);

module.exports = router;