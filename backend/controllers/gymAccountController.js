import GymAccount from "../models/GymAccount.js";

// Get all records by type
export const getAccounts = async (req, res) => {
  try {
    const { type } = req.params;
    const data = await GymAccount.find({ type });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new record
export const createAccount = async (req, res) => {
  try {
    const { type, time, value } = req.body;
    const newRecord = new GymAccount({ type, time, value });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a record by ID
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecord = await GymAccount.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a record by ID
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await GymAccount.findByIdAndDelete(id);
    if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
