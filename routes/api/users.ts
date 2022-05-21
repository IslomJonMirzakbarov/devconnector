import { Request, Response } from "express";
const express = require("express");
import { check, validationResult } from "express-validator";
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require("../../models/User");

const router = express.Router();

// @routes         POST api/users
// @desc           Register User
// @access         Public
router.post(
  "/",

  [
    check("name", "name shouldn't be empty").not().isEmpty(),
    check("email", "please enter a valid email address").isEmail(),
    check(
      "password",
      "password should be at least 6 characters long."
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = await gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        password,
        avatar
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      res.send("users route");
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json("Server error");
    }
  }
);

module.exports = router;
