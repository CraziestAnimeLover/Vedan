import GymEquipmentBill from "../models/GymEquipmentBillModel.js";

// 🟢 Get all Equipment Bills
export const getGymEquipmentBill = async (req, res) => {
  try {
    const bills = await GymEquipmentBill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve equipment bills", error: error.message });
  }
};

// 🟢 Get Equipment Bill by ID
export const getGymEquipmentBillById = async (req, res) => {
  try {
    const bill = await GymEquipmentBill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bill", error: error.message });
  }
};

// 🟢 Create a Single Equipment Bill
export const createGymEquipmentBill = async (req, res) => {
  try {
    const newBill = new GymEquipmentBill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: "Failed to create equipment bill", error: error.message });
  }
};

// 🟢 Bulk Insert Equipment Bills
export const bulkCreateGymEquipmentBill = async (req, res) => {
    try {
      if (!req.body.bills || !Array.isArray(req.body.bills)) {
        return res.status(400).json({ message: "Invalid data format. Expected an array of bills." });
      }

      const newBills = req.body.bills.map((bill) => ({
        description: bill.description || "No Description",
        quantity: bill.quantity !== undefined ? Number(bill.quantity) : 0,  // ✅ Use correct field names
        price: bill.price !== undefined ? Number(bill.price) : 0,  // ✅ Use correct field names
        currency: bill.currency || "USD",
        convertedPrice: bill.convertedPrice !== undefined ? Number(bill.convertedPrice) : 0,
        createdAt: bill.createdAt ? new Date(bill.createdAt) : new Date(),
      }));

      const createdBills = await GymEquipmentBill.insertMany(newBills);
      res.status(201).json(createdBills);
    } catch (error) {
      console.error("❗ Error in bulkCreateGymGymEquipmentBill:", error);
      res.status(500).json({ message: "Failed to save bills", error: error.message });
    }
};

  

  
  
  
  

// 🟢 Update Equipment Bill
export const updateGymEquipmentBill = async (req, res) => {
  try {
    const updatedBill = await GymEquipmentBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bill", error: error.message });
  }
};

// 🟢 Delete Equipment Bill
export const deleteGymEquipmentBill = async (req, res) => {
  try {
    const deletedBill = await GymEquipmentBill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete bill", error: error.message });
  }
};
