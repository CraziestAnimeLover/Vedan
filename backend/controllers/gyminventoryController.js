import GymInventory from "../models/GymInventory.js"; // ✅ Ensure correct import

// Get all inventory items
export async function getAllItems(req, res) {
  try {
    const items = await GymInventory.find(); // ✅ Fix: Call find() on GymInventory
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get single inventory item by ID
export async function getItemById(req, res) {
  try {
    const item = await GymInventory.findById(req.params.id); // ✅ Fix
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new inventory item
export const createItem = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const { itemName, quantity, condition, remark } = req.body;

    // Ensure quantity is a number
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
      return res.status(400).json({ message: "Quantity must be a valid number." });
    }

    const newItem = new GymInventory({ // ✅ Fix: Use correct model name
      itemName: String(itemName),
      quantity: parsedQuantity,
      condition: String(condition),
      remark: String(remark),
      description: req.file ? req.file.path : null,
    });

    await newItem.save();
    res.status(201).json({ message: "Inventory item saved successfully!", newItem });
  } catch (error) {
    console.error("Error saving inventory item:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update an existing inventory item
export async function updateItem(req, res) {
  try {
    const updatedData = req.body;
    if (req.file) updatedData.description = req.file.path;

    const updatedItem = await GymInventory.findByIdAndUpdate(req.params.id, updatedData, { new: true }); // ✅ Fix
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete an inventory item
export async function deleteItem(req, res) {
  try {
    const deletedItem = await GymInventory.findByIdAndDelete(req.params.id); // ✅ Fix
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
