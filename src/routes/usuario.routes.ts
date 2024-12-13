import { Router } from 'express';
import {
    usuarioUpdate,
    usuarioUpdateEstado,
    usuariosList
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, usuariosList);
router.put('/:id', authMiddleware, usuarioUpdate);
router.put('/estado/:id', authMiddleware, usuarioUpdateEstado);

export default router;
