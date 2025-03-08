import MachineMaintenance from "../models/AharMachineMaintenance.js";

// Create a new machine maintenance record
export async function createMaintenance(req, res) {
  try {
    const maintenance = new MachineMaintenance(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all maintenance records
export async function getAllMaintenance(req, res) {
  try {
    const maintenanceRecords = await MachineMaintenance.find();
    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single maintenance record by ID
export async function getMaintenanceById(req, res) {
  try {
    const maintenance = await MachineMaintenance.findById(req.params.id);
    if (!maintenance) return res.status(404).json({ message: "Record not found" });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a maintenance record
export async function updateMaintenance(req, res) {
  try {
    const updatedMaintenance = await MachineMaintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMaintenance) return res.status(404).json({ message: "Record not found" });
    res.json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a maintenance record
export async function deleteMaintenance(req, res) {
  try {
    const deletedMaintenance = await MachineMaintenance.findByIdAndDelete(req.params.id);
    if (!deletedMaintenance) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
