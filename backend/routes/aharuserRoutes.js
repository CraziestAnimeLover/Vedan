import { Router } from 'express';
const router = Router();
import { createUser, getUsers, deleteUser } from '../controllers/aharuserController.js';

router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;