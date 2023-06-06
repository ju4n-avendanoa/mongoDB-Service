import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is connected`);
  } catch (error) {
    throw new Error(error);
  }
}

export default dbConnection;
