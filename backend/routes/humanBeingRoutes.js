import { Router } from 'express';
const router = Router();
import { createHumanBeing, getAllHumanBeings, getHumanBeingById, updateHumanBeing, deleteHumanBeing } from '../controllers/humanBeingController.js';
import { singleUpload } from "../middlewares/mutler.js"; // Ensure correct path

router.post('/humans', singleUpload,createHumanBeing);
router.get('/humans', getAllHumanBeings);
router.get('/humans/:id', getHumanBeingById);
router.put('/humans/:id', updateHumanBeing);
router.delete('/humans/:id', deleteHumanBeing);

export default router;