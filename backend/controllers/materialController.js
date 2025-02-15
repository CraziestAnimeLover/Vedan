import Material from '../models/Material.js';

// Create a new material entry
export const createMaterial = async (req, res) => {
  console.log("✅ Received body:", req.body);
  console.log("✅ Received file:", req.file);
  console.log("✅ Received headers:", req.headers);

  if (!req.body.lostLocation || !req.body.materialType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newMaterial = new Material({
      lostLocation: req.body.lostLocation,
      lostDate: req.body.lostDate,
      lostTime: req.body.lostTime,
      height: req.body.height,
      length: req.body.length,
      width: req.body.width,
      weight: req.body.weight,
      diameter: req.body.diameter,
      materialType: req.body.materialType,
      image: imagePath,
      brandName: req.body.brandName,
      taxNumber: req.body.taxNumber,
      contactPerson: req.body.contactPerson,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material created successfully", material: newMaterial });
  } catch (error) {
    console.error("❌ Error saving to database:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all material records
export async function getAllMaterials(req, res) {
  try {
    const materials = await Material.find();
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error in getAllMaterials:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Get a single material record by ID
export async function getMaterialById(req, res) {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, material });
  } catch (error) {
    console.error("Error in getMaterialById:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Update a material record by ID
export async function updateMaterial(req, res) {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updatedData = { ...req.body };
    if (imagePath) updatedData.image = imagePath;

    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedMaterial) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: "Material details updated!", material: updatedMaterial });
  } catch (error) {
    console.error("Error in updateMaterial:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// Delete a material record by ID
export async function deleteMaterial(req, res) {
  try {
    const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Material entry deleted!' });
  } catch (error) {
    console.error("Error in deleteMaterial:", error.message);
    res.status(500).json({ error: error.message });
  }
}
