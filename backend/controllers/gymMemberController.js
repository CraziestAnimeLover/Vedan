import GymMember from "../models/GymMember.js";

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await GymMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await GymMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new member
export const createGymMember = async (req, res) => {
    try {
      const newMember = new GymMember({
        ...req.body,
        profileImage: req.file ? req.file.path : null,
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
    const updatedMember = await GymMember.findByIdAndUpdate(
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
export const deleteGymMember = async (req, res) => {
    try {
      const deletedMember = await GymMember.findByIdAndDelete(req.params.id);
      if (!deletedMember) return res.status(404).json({ message: "Member not found" });
  
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  