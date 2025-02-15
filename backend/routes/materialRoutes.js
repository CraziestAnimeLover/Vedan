import { Router } from 'express';
const router = Router();
import { 
    createMaterial, 
    getAllMaterials, 
    getMaterialById, 
    updateMaterial, 
    deleteMaterial 
} from '../controllers/materialController.js';
import { singleUpload } from "../middlewares/mutler.js"; // Ensure correct path

router.post('/materials', singleUpload, createMaterial);
router.get('/materials', getAllMaterials);
router.get('/materials/:id', getMaterialById);
router.put('/materials/:id', updateMaterial);
router.delete('/materials/:id', deleteMaterial);

export default router;
