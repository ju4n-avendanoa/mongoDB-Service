import mongoose from "mongoose";

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds "createdAt" and "updatedAt" fields
    versionKey: false, // Disables the "__v" field
  }
);

// Create a model based on the user schema
const userModel = mongoose.model("Usuarios", userSchema);

export default userModel;
