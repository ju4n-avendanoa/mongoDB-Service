import userModel from "../schema/userSchema.js";
import { hashPassword } from "../hashing.js";

// Retrieves all users from the database.
export async function getUser(req, res) {
  try {
    // Retrieve all users from the database using the user model
    const users = await userModel.find();

    // Return the users in JSON format as the response
    res.json(users);
  } catch (error) {
    // If an error occurs, send a 400 status code and the error as the response
    res.status(400).send(error);
  }
}

// Retrieves a user by ID from the database.
export async function getUserById(req, res) {
  const { id } = req.params;

  // Find a user by ID in the database using the user model
  const user = await userModel.findById(id);

  try {
    // Return the user in JSON format as the response with a 200 status code
    res.status(200).json(user);
  } catch (error) {
    // If the user is not found, send a 404 status code and the error as the response
    res.status(404).send(error);
  }
}

// Async function to create a new user
export async function createUser(req, res) {
  try {
    const { name, phone, email, password } = req.body;

    // Create a new user in the database using the user model
    const newUser = await userModel.create({
      name,
      phone,
      email,
      password: await hashPassword(password), // Hash the password before saving
    });

    // Return the new user in JSON format as the response
    res.json(newUser);
  } catch (error) {
    // If an error occurs, send a 400 status code and the error as the response
    res.status(400).send(error);
  }
}

// Async function to delete a user by ID
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    // Find and delete a user by ID in the database using the user model
    const user = await userModel.findByIdAndDelete(id);

    // Return the deleted user in JSON format as the response with a 200 status code
    res.status(200).json(user);
  } catch (error) {
    // If the user is not found, send a 404 status code and a "User not found" message
    res.status(404).send("User not found");
  }
}

export async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, password } = req.body;
    const options = { new: true };

    // Check if at least one field is provided for updating
    if (!name && !phone && !email && !password) {
      return res.status(400).send("Must provide at least one field");
    }

    let newData;

    // If password is provided, hash the password before updating
    if (password) {
      newData = { name, phone, email, password: await hashPassword(password) };
    } else {
      newData = { name, phone, email };
    }

    // Find and update the user by ID in the database using the user model
    const updatedUser = await userModel.findOneAndUpdate(id, newData, options);

    // Return the updated user in JSON format as the response
    res.json(updatedUser);
  } catch (error) {
    // If an error occurs, send a 500 status code and the error as the response
    res.status(500).send(error);
  }
}
