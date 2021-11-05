const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const fetchuser = require("../middlewares/fetchuser");

const JWT_TOKEN = "thisisastrongpwassword";

//Create a User using: POST  "/api/auth/createuser" (No login Required).
router.post(
  "/createuser",
  [body("email").isEmail(),body("name").isLength({min : 3}) , body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors return a status of 400 bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        //Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPwd = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPwd,
        });
        const data = {
          user: {
            id: user._id,
          },
        };

        const authToken = jwt.sign(data,process.env.JWT_TOKEN);
        res.json({ authToken });
      } else {
        res
          .status(400)
          .json({ error: "Sorry User with this email aldready exists" });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Some Internal error occured please try again" });
    }
  }
);

//Authenticate a user using: POST "/api/auth/login" (No login Required)

router.post(
  "/login",
  [
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors return a status of 400 bad request
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      //User does not exist
      if (!user) {
        return res.status(400).json({ error: "No user found with this email" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, user.password);

      //Passwords not matching
      if (!pwdCompare) {
        return res
          .status(401)
          .json({ error: "Try logging in with valid credentials" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_TOKEN);
      res.json({ authToken });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Some Internal error occured please try again" });
    }
  }
);

//Get logged in user details using : POST '/api/auth/getuser' (Login Required)
router.get("/getuser", fetchuser, async (req, res) => {
  //get the current user's id from req body as it was appended to it.
  userId = req.user.id;

  //Find the user by Id if available send it.
  try {
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Some Internal error occured please try again" });
  }
});

module.exports = router;
