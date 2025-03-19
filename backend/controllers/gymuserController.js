import GymUser from "../models/GymUser.js";
import bcrypt from "bcryptjs";

export async function createUser(req, res) {
  try {
    const { selectedPlan, name, phone, email, password, permissions } = req.body;

    // Check if user exists
    const existingUser = await GymUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new GymUser({ selectedPlan, name, phone, email, password: hashedPassword, permissions });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await GymUser.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await GymUser.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await GymUser.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };