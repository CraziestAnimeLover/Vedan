import BalanceSheet from "../models/AharBalanceSheet.js";

// ✅ Get all balance sheets
export const getBalanceSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const balanceSheet = await BalanceSheet.findById(id);
    if (!balanceSheet) {
      return res.status(404).json({ message: "Balance Sheet not found" });
    }
    res.json(balanceSheet);
  } catch (error) {
    console.error("Error fetching balance sheet by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Fetch All Balance Sheets
export const getBalanceSheets = async (req, res) => {
  try {
    const balanceSheets = await BalanceSheet.find(); // Fetch all balance sheets
    res.json(balanceSheets);
  } catch (error) {
    console.error("Error fetching balance sheets:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// ✅ Get the latest balance sheet
export const getLatestBalanceSheet = async (req, res) => {
  try {
    const latestBalanceSheet = await AharBalanceSheet.findOne().sort({ createdAt: -1 });

    if (!latestBalanceSheet) {
      console.warn("⚠️ No balance sheet found!");
      return res.status(404).json({ message: "No balance sheet found!" });
    }

    console.log("📄 Balance Sheet Data:", latestBalanceSheet);

    res.status(200).json({
      _id: latestBalanceSheet._id || null, // Ensure _id is not undefined
      assets: latestBalanceSheet.assets || [],
      liabilities: latestBalanceSheet.liabilities || [],
      equity: latestBalanceSheet.equity || 0,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ message: "Server error while fetching balance sheet!", error: error.message });
  }
};
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
