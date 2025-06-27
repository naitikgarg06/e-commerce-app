const mongoose = require("mongoose");

require("dotenv").config();
const mongoUri = process.env.MONGODB;

async function initialiseDatabase() {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { initialiseDatabase }