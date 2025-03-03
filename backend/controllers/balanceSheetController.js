import BalanceSheet from "../models/BalanceSheet.js";

// ✅ Get all balance sheets
export async function getBalanceSheets(req, res) {
  try {
    const balanceSheets = await find();
    res.status(200).json(balanceSheets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getBalanceSheetById(req, res) {
    try {
      const { id } = req.params;
      const balanceSheet = await BalanceSheet.findById(id);
  
      if (!balanceSheet) {
        return res.status(404).json({ message: "Balance sheet not found" });
      }
  
      res.json(balanceSheet);
    } catch (error) {
      console.error("Error fetching balance sheet by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
// ✅ Get a single balance sheet by ID
export async function getLatestBalanceSheet(req, res) {
    try {
      const latestSheet = await BalanceSheet.findOne().sort({ createdAt: -1 });
  
      if (!latestSheet) {
        return res.status(404).json({ message: "No balance sheet found" });
      }
  
      res.json(latestSheet);
    } catch (error) {
      console.error("Error fetching latest balance sheet:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  

// ✅ Create a new balance sheet
export async function createBalanceSheet(req, res) {
  try {
    const { assets, liabilities, equity } = req.body;
    const newBalanceSheet = new BalanceSheet({ assets, liabilities, equity });
    await newBalanceSheet.save();
    res.status(201).json(newBalanceSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// ✅ Update a balance sheet
export async function updateBalanceSheet(req, res) {
    try {
      const { id, assets, liabilities, equity } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Balance sheet ID is required" });
      }
  
      const updatedSheet = await BalanceSheet.findByIdAndUpdate(
        id,
        { assets, liabilities, equity },
        { new: true, runValidators: true }
      );
  
      if (!updatedSheet) {
        return res.status(404).json({ message: "Balance sheet not found" });
      }
  
      res.json({ message: "Balance sheet updated successfully", data: updatedSheet });
    } catch (error) {
      console.error("Error updating balance sheet:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  

  
  
  

// ✅ Delete a balance sheet
export async function deleteBalanceSheet(req, res) {
  try {
    const deletedSheet = await findByIdAndDelete(req.params.id);
    if (!deletedSheet) return res.status(404).json({ message: "Balance Sheet not found" });
    res.status(200).json({ message: "Balance Sheet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



  