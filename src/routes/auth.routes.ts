import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';

const router = Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.post('/logoutUser', logoutUser);

export default router;
