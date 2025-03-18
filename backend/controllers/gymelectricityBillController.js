import GymElectricityBill from "../models/GymElectricityBill.js";

// Get all electricity bills
export const getGymElectricityBills = async (req, res) => {
  try {
    const bills = await GymElectricityBill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single electricity bill
export const getGymElectricityBillById = async (req, res) => {
  try {
    const bill = await GymElectricityBill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new electricity bill
export const createGymElectricityBill = async (req, res) => {
  try {
    const newBill = new GymElectricityBill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an electricity bill
export const updateGymElectricityBill = async (req, res) => {
  try {
    const updatedBill = await GymElectricityBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) return res.status(404).json({ message: "Bill not found" });
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an electricity bill
export const deleteGymElectricityBill = async (req, res) => {
  try {
    const deletedBill = await GymElectricityBill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bulkCreateGymElectricityBill = async (req, res) => {
    try {
      const { bills } = req.body;
  
      if (!Array.isArray(bills) || bills.length === 0) {
        return res.status(400).json({ message: "No bills provided for insertion" });
      }
  
      const insertedBills = await GymElectricityBill.insertMany(bills);
      res.status(201).json(insertedBills);
    } catch (error) {
      console.error("Error saving bills:", error);
      res.status(500).json({ message: "Failed to save bills", error: error.message });
    }
  };