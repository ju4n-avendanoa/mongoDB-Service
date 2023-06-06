import userModel from "../schema/userSchema.js";
import { hashPassword } from "../hashing.js";

export async function getUser(req, res) {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await userModel.findById(id);
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function createUser(req, res) {
  try {
    const { name, phone, email, password } = req.body;
    const newUser = await userModel.create({
      name,
      phone,
      email,
      password: await hashPassword(password),
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
}

export async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, password } = req.body;
    const options = { new: true };
    if (!name && !phone && !email && !password) {
      return res.status(400).send("Must provide at least one field");
    }
    let newData;
    if (password) {
      newData = { name, phone, email, password: await hashPassword(password) };
    } else {
      newData = { name, phone, email };
    }
    const updatedUser = await userModel.findOneAndUpdate(id, newData, options);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}
