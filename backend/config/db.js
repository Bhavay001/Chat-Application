require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR : ${error.message}`);
    process.exit();
  }
};
mongoose.set("strictQuery", false);

module.exports = connectDB;
