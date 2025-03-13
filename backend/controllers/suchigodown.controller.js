import SuchiGodown from "../models/suchigodown.model.js";

// Get all inventory items
export const getAllItems = async (req, res) => {
  try {
    const items = await SuchiGodown.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Get a single item
export const getItemById = async (req, res) => {
  try {
    const item = await SuchiGodown.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
      // Check if a file is uploaded
      let picPath = "";
      if (req.files && req.files.length > 0) {
        picPath = req.files[0].path;  // multer stores files in `req.files`
      }
  
      // Create a new item object
      const newItem = new SuchiGodown({
        name: req.body.name,
        pic: picPath, // Save the file path to the database
        category: req.body.category,
        expireDate: req.body.expireDate,
        price: req.body.price,
        manufacturing: req.body.manufacturing,
        quantity: req.body.quantity,
        unit: req.body.unit,
        total: req.body.total,
        description: req.body.description, // Assuming description is text
      });
  
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error("Error creating item:", error); // Add more detailed logging here
      res.status(500).json({ message: "Error creating item", error: error.message });
    }
  };
  
  

// Update an item
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await SuchiGodown.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await SuchiGodown.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

const getItems = (req, res) => {
    try {
      // Simulate fetching items from a database
      const items = []; // Empty array if no items found
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items", error });
    }
  };
  