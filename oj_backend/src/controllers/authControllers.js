const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const generateToken = (user) => {
  return jwt.sign(
    {
      isAdmin: user.isAdmin,
      userEmail: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );
};

router.post(
  "/register",
  body("email").notEmpty().withMessage("Email is Required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("name").notEmpty().withMessage("Name is Required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if email already present in database or not
      let user = await User.findOne({ email: req.body.email });

      // if it is present in database then throw error
      if (user) {
        return res.status(400).send({
          message: "User already exists with that email",
          status: "error",
        });
      }
      // if user in unique then create user
      user = await User.create(req.body);
      return res
        .status(201)
        .send({ status: "success", message: "register successfully", user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
);

router.post(
  "/login",
  body("email").notEmpty().withMessage("Email is Required"),
  body("password").notEmpty().withMessage("Password is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if email already present in database or not
      let user = await User.findOne({ email: req.body.email });

      // if it is present in database then throw error
      if (!user) {
        return res.status(400).send({
          message: "Incorrect email or password",
          status: "error",
        });
      }

      // match the user entered password and database password
      const matchPassword = user.checkPassword(req.body.password);
      if (!matchPassword) {
        return res.status(400).send({
          message: "Incorrect email or password",
          status: "error",
        });
      }

      // if password also matches then create a token
      const token = generateToken(user);

      // before sending whole object make sure you send token and passowrd null
      user.token = token;
      user.password = null;

      // store cookies
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      // send the token
      res.status(201).cookie("token", token, options).json({
        status: "success",
        message: "user logged successfully",
        token,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
);

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(201)
    .json({ message: "Logged out successfully", status: "success" });
});

module.exports = router;
