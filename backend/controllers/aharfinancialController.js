import FinancialData from "../models/AharFinancialData.js";

// Get all financial records
export const getFinancialData = async (req, res) => {
    try {
      let financialData = await FinancialData.findOne();
  
      if (!financialData) {
        console.log("⚠️ No financial data found. Creating default entry...");
  
        const newEntry = await FinancialData.create({
          revenue: [],
          profit: [],
          networth: [],
        });
  
        console.log("✅ Created new financial data entry:", newEntry);
        return res.json(newEntry); // ✅ Send new document with `_id`
      }
  
      console.log("✅ Returning existing financial data:", financialData);
      res.json(financialData); // ✅ Ensure `_id` is returned
    } catch (error) {
      console.error("❌ Error fetching financial data:", error);
      res.status(500).json({ error: "Error fetching financial data", details: error.message });
    }
  };
  
  
  
  
  

// Add new financial data entry
export const addFinancialData = async (req, res) => {
  try {
    const { category, time, value } = req.body;
    const newEntry = new FinancialData({ category, time, value });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update financial data entry
export const updateFinancialData = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body; // Ensure we are receiving JSON data
  
      // Assuming you are using a database like MongoDB or SQL
      const result = await FinancialModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!result) {
        return res.status(404).json({ error: "Data not found" });
      }
  
      res.json({ message: "Financial data updated successfully", data: result }); // ✅ Ensure JSON response
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };
  

// Delete financial data entry
export const deleteFinancialData = async (req, res) => {
  try {
    const { id } = req.params;
    await FinancialData.findByIdAndDelete(id);
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
