import Inventory from "../models/DemanInventory.js"; 

// Create Inventory Entry
export async function createInventory(req, res) {
  try {
    const newEntry = new Inventory(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Inventory entry added successfully", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error adding inventory entry", error: error.message });
  }
}

// Get All Inventory Entries
// export async function getAllInventories(req, res) {
//   try {
//     const entries = await Inventory.find();
//     res.status(200).json(entries);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching inventory data", error: error.message });
//   }
// }

// Get Inventory Entry by ID
export async function getInventoryById(req, res) {
  try {
    const entry = await Inventory.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Inventory entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory entry", error: error.message });
  }
}

// Update Inventory Entry
export async function updateInventory(req, res) {
  try {
    const updatedEntry = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: "Inventory entry not found" });
    }
    res.status(200).json({ message: "Inventory entry updated successfully", data: updatedEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory entry", error: error.message });
  }
}

// Delete Inventory Entry
export async function deleteInventory(req, res) {
  try {
    const deletedEntry = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Inventory entry not found" });
    }
    res.status(200).json({ message: "Inventory entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory entry", error: error.message });
  }
}

export async function getAllInventories(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const entries = await Inventory.find().skip(skip).limit(limit);
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching inventory data", error });
    }
  }
  