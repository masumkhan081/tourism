const mongoose = require("mongoose");
require("dotenv").config();

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "x-furniture-showroom",
    });
    console.log("Mongodb connected!");
  } catch (error) {
    console.log("Mongodb not connected!");
  }
};

module.exports =  mongodbConnection;
