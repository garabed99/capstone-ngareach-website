const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_PATH);
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error message:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
