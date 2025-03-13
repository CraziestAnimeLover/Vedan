import AharMember from "../models/AharMember.js";

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await AharMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await AharMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new member
export const createMember = async (req, res) => {
  try {
    const newMember = new AharMember({
      ...req.body,
      profileImage: req.file ? req.file.path : null, // Handle file uploads
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update member
export const updateMember = async (req, res) => {
  try {
    const updatedMember = await AharMember.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profileImage: req.file ? req.file.path : req.body.profileImage },
      { new: true }
    );
    if (!updatedMember) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  try {
    const deletedMember = await AharMember.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: "Member not found" });
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  