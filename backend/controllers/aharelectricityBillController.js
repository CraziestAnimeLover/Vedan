import ElectricityBill from "../models/AharElectricityBill.js";

// Get all electricity bills
export const getElectricityBills = async (req, res) => {
  try {
    const bills = await ElectricityBill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single electricity bill
export const getElectricityBillById = async (req, res) => {
  try {
    const bill = await ElectricityBill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new electricity bill
export const createElectricityBill = async (req, res) => {
  try {
    const newBill = new ElectricityBill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an electricity bill
export const updateElectricityBill = async (req, res) => {
  try {
    const updatedBill = await ElectricityBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) return res.status(404).json({ message: "Bill not found" });
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an electricity bill
export const deleteElectricityBill = async (req, res) => {
  try {
    const deletedBill = await ElectricityBill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bulkCreateElectricityBills = async (req, res) => {
    try {
      const { bills } = req.body;
  
      if (!Array.isArray(bills) || bills.length === 0) {
        return res.status(400).json({ message: "No bills provided for insertion" });
      }
  
      const insertedBills = await ElectricityBill.insertMany(bills);
      res.status(201).json(insertedBills);
    } catch (error) {
      console.error("Error saving bills:", error);
      res.status(500).json({ message: "Failed to save bills", error: error.message });
    }
  };