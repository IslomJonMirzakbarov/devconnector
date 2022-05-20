import { Request, Response } from "express";
const express = require("express");

const router = express.Router();

// @routes         GET api/auth
// @desc           Test Route
// @access         Public
router.get("/", (req: Request, res: Response) => res.send("auth route"));

module.exports = router;
