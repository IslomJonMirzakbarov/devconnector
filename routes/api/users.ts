import { Request, Response } from "express";
const express = require("express");
import { check, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("users route");
  }
);

module.exports = router;
