import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

/**
 * Establishes a connection to the database using the Mongoose library.
 * Reads the connection string from the environment variable MONGODB_URI.
 */
async function dbConnection() {
  try {
    await mongoose.connect("mongodb://mongodb:27017/mydb");
    console.log(`Database is connected`);
  } catch (error) {
    throw new Error(error);
  }
}

export default dbConnection;
