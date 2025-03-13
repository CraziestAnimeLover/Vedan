import express from "express";
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/aharMemberController.js";
import {  uploadFiles } from "../middlewares/mutler.js";

// Middleware for file uploads

const router = express.Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);

router.post("/", uploadFiles, createMember);
router.put("/:id", uploadFiles, updateMember);


router.delete("/:id", deleteMember);
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
