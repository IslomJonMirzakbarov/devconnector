import { Request, Response } from "express";
const express = require("express");

const router = express.Router();

// @routes         GET api/profile
// @desc           Test Route
// @access         Public
router.get("/", (req: Request, res: Response) => res.send("profile route"));

module.exports = router;
