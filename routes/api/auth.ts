import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
import { check, validationResult } from "express-validator";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes         POST api/auth
// @desc           Authenticate user & get token
// @access         Public
router.post(
  "/",

  [
    check("email", "please enter a valid email address").isEmail(),
    check("password", "password is required").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Send jwt
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err: any, token: any) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json("Server error");
    }
  }
);

module.exports = router;
