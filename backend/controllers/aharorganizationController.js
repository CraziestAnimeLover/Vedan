import Organization from '../models/AaharMultipleOrganization.js';

// Create a new organization
export const createOrganization = async (req, res) => {
  try {
    const { orgName, opendate, vedannId, address, phone, email, founders } = req.body;
    const newOrg = new Organization({ orgName, opendate, vedannId, address, phone, email, founders });
    await newOrg.save();
    res.status(201).json(newOrg);
  } catch (error) {
    res.status(400).json({ message: 'Error creating organization', error });
  }
};

// Get all organizations
export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organizations', error });
  }
};

// Get organization by ID
export const getOrganizationById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization', error });
  }
};

// Update an organization
export const updateOrganization = async (req, res) => {
  try {
    const { orgName, opendate, vedannId, address, phone, email, founders } = req.body;
    const updatedOrg = await Organization.findByIdAndUpdate(
      req.params.id,
      { orgName, opendate, vedannId, address, phone, email, founders },
      { new: true }
    );
    if (!updatedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json(updatedOrg);
  } catch (error) {
    res.status(400).json({ message: 'Error updating organization', error });
  }
};

// Delete an organization
export const deleteOrganization = async (req, res) => {
  try {
    const deletedOrg = await Organization.findByIdAndDelete(req.params.id);
    if (!deletedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting organization', error });
  }
};
