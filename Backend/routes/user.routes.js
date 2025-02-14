const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUserController, loginUserController } = require('../controllers/user.controllers');

// Register
router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be atleast 3 characters long"),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
],
    registerUserController
);

router.post("/login",[
  body("email").isEmail().withMessage("Invalid Email"),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
],
  loginUserController
);
module.exports = router;
