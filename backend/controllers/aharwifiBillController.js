import WifiBill  from  "../models/AharWifiBill.js";

// Create a new WiFi bill
export async function createWifiBill(req, res) {
  try {
    const wifiBill = new WifiBill(req.body);
    await wifiBill.save();
    res.status(201).json(wifiBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all WiFi bills
export async function getAllWifiBills(req, res) {
  try {
    const wifiBills = await find();
    res.status(200).json(wifiBills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single WiFi bill by ID
export async function getWifiBillById(req, res) {
  try {
    const wifiBill = await findById(req.params.id);
    if (!wifiBill) return res.status(404).json({ message: "WiFi bill not found" });
    res.status(200).json(wifiBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a WiFi bill by ID
export async function updateWifiBill(req, res) {
  try {
    const wifiBill = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wifiBill) return res.status(404).json({ message: "WiFi bill not found" });
    res.status(200).json(wifiBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a WiFi bill by ID
export async function deleteWifiBill(req, res) {
  try {
    const wifiBill = await findByIdAndDelete(req.params.id);
    if (!wifiBill) return res.status(404).json({ message: "WiFi bill not found" });
    res.status(200).json({ message: "WiFi bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const bulkInsertWifiBills = async (req, res) => {
    try {
      const { bills } = req.body;
  
      // Check if bills exist and are properly formatted
      if (!Array.isArray(bills) || bills.length === 0) {
        return res.status(400).json({ message: "Invalid data: 'bills' must be a non-empty array." });
      }
  
      // Validate that all required fields are present
      for (let bill of bills) {
        if (bill.wifiPackagePrice === undefined || bill.wifiPackagePrice === null) {
          return res.status(400).json({ message: "Each bill must have 'wifiPackagePrice'." });
        }
      }
  
      console.log("📌 Bulk insert request received:", bills); // Debug incoming data
  
      // Insert bills into MongoDB
      const createdBills = await WifiBill.insertMany(bills);
  
      res.status(201).json({ message: "Bills added successfully", createdBills });
    } catch (error) {
      console.error("🔥 Bulk insert error:", error);
      res.status(500).json({ message: "Error inserting bills", error: error.message });
    }
  };
  
  