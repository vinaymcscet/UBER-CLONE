const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");

const createRideController = async (req, res, next) => {
  console.log("req", req);
  const errors = validationResult(req);
  console.log("error", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("pickupCoordinates", pickupCoordinates.coordinates.latitude,
        pickupCoordinates.coordinates.longitude);
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.coordinates.latitude,
      pickupCoordinates.coordinates.longitude,
      150
    );
    ride.otp = "";
    console.log("captainInRadiusSocket", captainsInRadius);
    captainsInRadius.map(captain => {
        sendMessageToSocketId(captain.socketId, {
            event: 'new-ride',
            data: ride,
        })
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFareController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRideController,
  getFareController,
};
