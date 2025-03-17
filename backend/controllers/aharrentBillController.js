import RentBill from "../models/AharrentBillModel.js";

// Get all rent bills
export const getRentBills = async (req, res) => {
  try {
    const rentBills = await RentBill.find();
    res.json(rentBills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new rent bill
export const createRentBill = async (req, res) => {
  try {
    console.log("Received Rent Bill Data:", req.body);

    // Check if required fields are present
    if (!req.body.billFrom || !req.body.billTo || !req.body.rentAmount || !req.body.billingDate || !req.body.currency) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const rentBill = new RentBill(req.body);
    const savedBill = await rentBill.save();

    res.status(201).json(savedBill);
  } catch (error) {
    console.error("Error saving Rent Bill:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update a rent bill
export const updateRentBill = async (req, res) => {
  try {
    const updatedBill = await RentBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rent bill
export const deleteRentBill = async (req, res) => {
  try {
    await RentBill.findByIdAndDelete(req.params.id);
    res.json({ message: "Rent Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
