import Preventive from "../models/GymPreventiveModel.js";

// ✅ Create a new preventive action entry
export const createPreventive = async (req, res) => {
  try {
    const { itemName, inspectionBy, rows, notations } = req.body;
    const newPreventive = new Preventive({ itemName, inspectionBy, rows, notations });
    await newPreventive.save();
    res.status(201).json({ message: "Preventive action created", data: newPreventive });
  } catch (error) {
    res.status(500).json({ message: "Error creating preventive action", error });
  }
};

// 🔍 Get all preventive action entries
export const getPreventives = async (req, res) => {
  try {
    const preventives = await Preventive.find();
    res.status(200).json(preventives);
  } catch (error) {
    res.status(500).json({ message: "Error fetching preventive actions", error });
  }
};

// 🔍 Get a single preventive action by ID
export const getPreventiveById = async (req, res) => {
  try {
    const preventive = await Preventive.findById(req.params.id);
    if (!preventive) return res.status(404).json({ message: "Preventive action not found" });
    res.status(200).json(preventive);
  } catch (error) {
    res.status(500).json({ message: "Error fetching preventive action", error });
  }
};

// ✏️ Update a preventive action by ID
export const updatePreventive = async (req, res) => {
  try {
    const updatedPreventive = await Preventive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPreventive) return res.status(404).json({ message: "Preventive action not found" });
    res.status(200).json({ message: "Preventive action updated", data: updatedPreventive });
  } catch (error) {
    res.status(500).json({ message: "Error updating preventive action", error });
  }
};

// 🗑️ Delete a preventive action by ID
export const deletePreventive = async (req, res) => {
  try {
    const deletedPreventive = await Preventive.findByIdAndDelete(req.params.id);
    if (!deletedPreventive) return res.status(404).json({ message: "Preventive action not found" });
    res.status(200).json({ message: "Preventive action deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting preventive action", error });
  }
};
