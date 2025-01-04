import { Router } from 'express';
import {
    clientesGetAll,
    clientesGetByUsuarioId,
    clienteUpdate
} from '../controllers/cliente.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, clientesGetAll);
router.get('/usuario/:usuario_id', authMiddleware, clientesGetByUsuarioId);
router.put('/:cliente_id', authMiddleware, clienteUpdate);

export default router;
