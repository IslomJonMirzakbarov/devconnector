import { Request, Response } from "express";
const express = require("express");

const router = express.Router();

// @routes         GET api/user
// @desc           Test Route
// @access         Public
router.get("/", (req: Request, res: Response) => res.send("users route"));

module.exports = router;
