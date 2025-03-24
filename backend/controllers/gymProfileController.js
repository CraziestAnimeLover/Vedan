import GymProfile from "../models/GymProfile.js";

// 📌 GET all gym profiles
export async function getAllGymProfiles(req, res) {
  try {
    const profiles = await GymProfile.find(); // ✅ Call on the model
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 📌 GET a single gym profile
export async function getGymProfileById(req, res) {
    try {
      const profile = await GymProfile.findOne({ gymId: req.params.id }); // ✅ Find by gymId
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching gym profile:", error);
      res.status(500).json({ message: error.message });
    }
  }
  

// 📌 CREATE a new gym profile
export async function createGymProfile(req, res) {
  try {
    const newProfile = new GymProfile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 📌 UPDATE a gym profile
export async function updateGymProfile(req, res) {
  try {
    const updatedProfile = await GymProfile.findByIdAndUpdate( // ✅ Call on the model
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 📌 DELETE a gym profile
export async function deleteGymProfile(req, res) {
  try {
    const deletedProfile = await GymProfile.findByIdAndDelete(req.params.id); // ✅ Call on the model
    if (!deletedProfile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
