import AharUser from '../models/AharUser.js';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;


export async function createUser(req, res) {
  try {
    const { selectedPlan, name, phone, email, password, permissions } = req.body;
    const hashedPassword = await hash(password, 10);
    const newUser = new AharUser({ selectedPlan, name, phone, email, password: hashedPassword, permissions });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await AharUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await AharUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}