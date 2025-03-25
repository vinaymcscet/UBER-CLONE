const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  // Calculate fare based on distance and duration
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  console.log("originAddr", distanceTime);
  // Define fare rates for different vehicle types
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };
  const perMinRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };
  const fare = {
    auto:
      Math.round(baseFare.auto +
      perKmRate.auto * (distanceTime.data.distance.meters / 1000) +
      perMinRate.auto * (distanceTime.data.duration.seconds / 60)),
    car:
    Math.round(baseFare.car +
      perKmRate.car * (distanceTime.data.distance.meters / 1000) +
      perMinRate.car * (distanceTime.data.duration.seconds / 60)),
    moto:
    Math.round(baseFare.moto +
      perKmRate.moto * (distanceTime.data.distance.meters / 1000) +
      perMinRate.moto * (distanceTime.data.duration.seconds / 60)),
  };
  console.log("fare", fare);
  return fare;
}

const getOtp = (num) => {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

const createRideService = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const fare = await getFare(pickup, destination);
    console.log("fare", fare);
    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6),
    });
    return ride;
};


module.exports = {
  createRideService,
  getFare
};
