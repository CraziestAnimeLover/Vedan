import { Router } from 'express';
import { createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';
const router = Router();

router.post('/', createSchedule);
router.get('/', getSchedules);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;