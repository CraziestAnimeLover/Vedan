import express from "express";
import {
    getMembers as getGymMembers,  // ✅ Correct alias
    getMemberById as getGymMemberById, // ✅ Correct alias
    createGymMember,
    updateMember as updateGymMember, // ✅ Correct alias
    deleteGymMember,
  } from "../controllers/gymMemberController.js";
  
import {  uploadFiles } from "../middlewares/mutler.js";

// Middleware for file uploads

const router = express.Router();

router.get("/", getGymMembers);
router.get("/:id", getGymMemberById);

router.post("/", uploadFiles, createGymMember);
router.put("/:id", uploadFiles, updateGymMember);


router.delete("/:id", deleteGymMember);
router.get("/:memberId", async (req, res) => {
    try {
      const { memberId } = req.params;
  
      if (!memberId) {
        return res.status(400).json({ message: "Member ID is required" });
      }
  
      const member = await Member.findOne({ memberId: memberId });
  
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      res.json(member);
    } catch (error) {
      console.error("Error fetching member profile:", error);
      res.status(500).json({ message: "Error fetching profile", error });
    }
  });
  export default router;
