import Inventory from '../models/ReuseInventory.js';

// ✅ Create inventory with validation
export const createInventory = (req, res) => {
    try {
      // Log received data
      console.log('Received form data:', req.body);
      console.log('Uploaded files:', req.files);
  
      const { name, category, expireDate, price, manufacturing, quantityNumber, quantityKgL, offer, description } = req.body;
      const pic = req.files['pic'] ? req.files['pic'][0] : null;
      const desc = req.files['description'] ? req.files['description'][0] : null;
  
      // Check if any fields are missing or invalid
      if (!name || !category || !price) {
        return res.status(400).json({ message: 'Missing required fields!' });
      }
  
      // Process inventory creation here (e.g., saving data to the database)
      res.status(200).json({ message: 'Inventory successfully submitted!' });
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(500).json({ message: 'Failed to create inventory.' });
    }
  };
  
  
  
  
  

// ✅ Fetch all inventory items (optimized with lean)
export async function getInventory(req, res) {
    try {
      const { page = 1, limit = 10, search, category } = req.query;
  
      // ✅ Search filter (case-insensitive)
      const query = {};
      if (search) {
        query.$or = [
          { name: new RegExp(search, "i") }, 
          { category: new RegExp(search, "i") }
        ];
      }
  
      // ✅ Category filter
      if (category) {
        query.category = category;
      }
  
      // ✅ Fetch paginated results
      const inventory = await Inventory.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      
        .lean();
  
      // ✅ Get total count for pagination
      const total = await Inventory.countDocuments(query);
  
      res.json({ inventory, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

// ✅ Update inventory
export async function updateInventory(req, res) {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!inventory) return res.status(404).json({ error: "Inventory item not found." });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Delete inventory
export async function deleteInventory(req, res) {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Inventory item not found." });
    res.json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
