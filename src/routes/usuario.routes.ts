import { Router } from 'express';
import {
    usuarioListById,
    usuarioUpdate,
    usuarioUpdateEstado,
    usuariosList
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, usuariosList);
router.get('/:id', authMiddleware, usuarioListById);
router.put('/:id', authMiddleware, usuarioUpdate);
router.put('/estado/:id', authMiddleware, usuarioUpdateEstado);

export default router;
