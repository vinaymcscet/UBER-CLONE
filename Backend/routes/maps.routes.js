const express = require('express');
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const mapController = require('../controllers/map.controller');
const { body, query } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser, mapController.getCoordinatesController
);

router.post('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser, mapController.getDistanceTimeController
)

router.post('/get-suggestions', 
    [body('input').notEmpty().withMessage('Input is required')],
    authUser, mapController.getAutoCompleteSuggestionsController
);

module.exports = router;