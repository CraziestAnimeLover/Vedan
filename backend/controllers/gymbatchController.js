import Batch from "../models/GymbatchModel.js"; // Ensure you import the correct model

export const createBatch = async (req, res) => {
  try {
    const { batchName, batchLimit, batchOpenTime, batchCloseTime } = req.body;

    // ✅ Validate input
    if (!batchName || !batchLimit || !batchOpenTime || !batchCloseTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create new batch
    const newBatch = new Batch({
      batchName,
      batchLimit,
      batchOpenTime,
      batchCloseTime,
    });

    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Batches
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Batch
export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    await batch.deleteOne();
    res.json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
