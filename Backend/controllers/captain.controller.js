const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

const registerCaptainController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const { firstname, lastname } = fullname;
  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist" });
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
      vehicleType,
    });
    const token = captain.generateToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginCaptainController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

const getCaptainProfileController = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptainController = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
};

module.exports = {
  registerCaptainController,
  loginCaptainController,
  getCaptainProfileController,
  logoutCaptainController,
};
