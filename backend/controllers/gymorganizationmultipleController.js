import GymOrganization from '../models/GymMultipleOrganization.js';

// Create a new GymOrganization
export const createGymOrganization = async (req, res) => {
  try {
    const { orgName, opendate, vedannId, address, phone, email, founders } = req.body;
    const newOrg = new GymOrganization({ orgName, opendate, vedannId, address, phone, email, founders });
    await newOrg.save();
    res.status(201).json(newOrg);
  } catch (error) {
    res.status(400).json({ message: 'Error creating GymOrganization', error });
  }
};

// Get all GymOrganizations
export const getAllGymOrganizations = async (req, res) => {
  try {
    const GymOrganizations = await GymOrganization.find();
    res.status(200).json(GymOrganizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GymOrganizations', error });
  }
};

// Get GymOrganization by ID
export const getGymOrganizationById = async (req, res) => {
  try {
    const org = await GymOrganization.findById(req.params.id);
    if (!org) {
      return res.status(404).json({ message: 'GymOrganization not found' });
    }
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GymOrganization', error });
  }
};

// Update an GymOrganization
export const updateGymOrganization = async (req, res) => {
  try {
    const { orgName, opendate, vedannId, address, phone, email, founders } = req.body;
    const updatedOrg = await GymOrganization.findByIdAndUpdate(
      req.params.id,
      { orgName, opendate, vedannId, address, phone, email, founders },
      { new: true }
    );
    if (!updatedOrg) {
      return res.status(404).json({ message: 'GymOrganization not found' });
    }
    res.status(200).json(updatedOrg);
  } catch (error) {
    res.status(400).json({ message: 'Error updating GymOrganization', error });
  }
};

// Delete an GymOrganization
export const deleteGymOrganization = async (req, res) => {
  try {
    const deletedOrg = await GymOrganization.findByIdAndDelete(req.params.id);
    if (!deletedOrg) {
      return res.status(404).json({ message: 'GymOrganization not found' });
    }
    res.status(200).json({ message: 'GymOrganization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting GymOrganization', error });
  }
};
