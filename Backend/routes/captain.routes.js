const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptainController } = require("../controllers/captain.controller");

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'), 
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehicle Type')
],
    registerCaptainController
)

module.exports = router;