import BalanceSheet from "../models/BalanceSheet.js";

// ✅ Get all balance sheets
export async function getBalanceSheets(req, res) {
  console.log("Balance Sheet API Called");
  try {
      const balanceSheets = await BalanceSheet.find();
      console.log("Fetched Data:", balanceSheets);
      res.status(200).json(balanceSheets);
  } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ✅ Get a single balance sheet by ID
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

// ✅ Get the latest balance sheet
export async function getLatestBalanceSheet(req, res) {
  try {
      const latestSheet = await BalanceSheet.findOne().sort({ createdAt: -1 });

      if (!latestSheet) {
          console.log("🔴 No balance sheet found in DB.");
          return res.status(404).json({ message: "No balance sheet found" });
      }

      console.log("✅ Fetched Balance Sheet:", latestSheet);
      console.log("📌 Balance Sheet ID:", latestSheet._id); // ✅ Log _id to confirm it's present

      res.json({ 
        _id: latestSheet._id,  // ✅ Explicitly send _id
        assets: latestSheet.assets || [], 
        liabilities: latestSheet.liabilities || [], 
        equity: latestSheet.equity || 0 
      });
  } catch (error) {
      console.error("🔥 Error fetching latest balance sheet:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
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
    const deletedSheet = await BalanceSheet.findByIdAndDelete(req.params.id);
    if (!deletedSheet) return res.status(404).json({ message: "Balance Sheet not found" });
    res.status(200).json({ message: "Balance Sheet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
