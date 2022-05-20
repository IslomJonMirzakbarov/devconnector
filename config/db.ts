import { exit } from "process";

const mongoose = require("mongoose");

const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });

    console.log("connected to db");
  } catch (error: any) {
    console.error(error.message);
    // exit process with failure
    exit(1);
  }
};

module.exports = connectDB;
