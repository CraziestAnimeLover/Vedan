import AharWaterBill from "../models/AharWaterBill.js";
import mongoose from "mongoose";

export const getEntries = async (req , res) => {
    try{
        const entries = await AharWaterBill.find();
        res.json(entries);
    }catch (error){
        res.status(500).json({error: error.message})
    }
}
export const addEntry = async (req, res) => {
    try {
      const newEntry = new AharWaterBill(req.body);
      await newEntry.save();
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const deleteEntry = async (req, res) => {
    try {
      await AharWaterBill.findByIdAndDelete(req.params.id);
      res.json({ message: "Entry deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid entry ID" });
        }

        const updatedEntry = await AharWaterBill.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.json(updatedEntry);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};


