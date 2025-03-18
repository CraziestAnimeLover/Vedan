import GymWifiBill from "../models/GymWifiBill.js";

// Create a new WiFi bill
export async function createGymWifiBill(req, res) {
  try {
    const newWifiBill = new GymWifiBill(req.body);
    await newWifiBill.save();
    res.status(201).json(newWifiBill);
  } catch (error) {
    console.error("🔥 Error in createGymWifiBill:", error); // LOG ERROR
    res.status(400).json({ success: false, error: error.message });
  }
}

// Get all WiFi bills
export async function getAllGymWifiBills(req, res) {
  try {
    const gymWifiBills = await GymWifiBill.find();
    res.status(200).json(gymWifiBills);
  } catch (error) {
    console.error("🔥 Error in getAllGymWifiBills:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get a single WiFi bill by ID
export async function getGymWifiBillById(req, res) {
  try {
    const gymWifiBill = await GymWifiBill.findById(req.params.id);
    if (!gymWifiBill) {
      return res.status(404).json({ success: false, message: "WiFi bill not found" });
    }
    res.status(200).json(gymWifiBill);
  } catch (error) {
    console.error("🔥 Error in getGymWifiBillById:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a WiFi bill by ID
export async function updateGymWifiBill(req, res) {
  try {
    const updatedBill = await GymWifiBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) {
      return res.status(404).json({ success: false, message: "WiFi bill not found" });
    }
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("🔥 Error in updateGymWifiBill:", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

// Delete a WiFi bill by ID
export async function deleteGymWifiBill(req, res) {
  try {
    const deletedBill = await GymWifiBill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ success: false, message: "WiFi bill not found" });
    }
    res.status(200).json({ success: true, message: "WiFi bill deleted successfully" });
  } catch (error) {
    console.error("🔥 Error in deleteGymWifiBill:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Bulk Insert WiFi Bills
export async function bulkInsertGymWifiBills(req, res) {
  try {
    const { bills } = req.body;

    if (!Array.isArray(bills) || bills.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data: 'bills' must be a non-empty array." });
    }

    for (let bill of bills) {
      if (!bill.wifiPackagePrice) {
        return res.status(400).json({ success: false, message: "Each bill must have 'wifiPackagePrice'." });
      }
    }

    console.log("📌 Bulk insert request received:", bills);

    const createdBills = await GymWifiBill.insertMany(bills);
    res.status(201).json({ success: true, message: "GymBills added successfully", createdBills });
  } catch (error) {
    console.error("🔥 Bulk insert error:", error);
    res.status(500).json({ success: false, message: "Error inserting bills", error: error.message });
  }
}
