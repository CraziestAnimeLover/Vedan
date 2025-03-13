import Rating from "../models/AharRating.js";

// ✅ Add a new rating
export const addRating = async (req, res) => {
  try {
    const { keyPoint, number } = req.body;
    if (!keyPoint || !number) {
      return res.status(400).json({ message: "Key Point and Number are required" });
    }

    const newRating = new Rating({ keyPoint, number });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all ratings
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a rating
export const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { keyPoint, number } = req.body;

    const updatedRating = await Rating.findByIdAndUpdate(id, { keyPoint, number }, { new: true });

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRating = await Rating.findByIdAndDelete(id);

    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
