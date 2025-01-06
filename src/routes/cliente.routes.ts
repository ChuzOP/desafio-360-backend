import { Router } from 'express';
import {
    clienteGetById,
    clienteInactivate,
    clientesGetAll,
    clientesGetByUsuarioId,
    clienteUpdate
} from '../controllers/cliente.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, clientesGetAll);
router.get('/:cliente_id', authMiddleware, clienteGetById);
router.get('/usuario/:usuario_id', authMiddleware, clientesGetByUsuarioId);

router.put('/:cliente_id', authMiddleware, clienteUpdate);
router.put('/inactivate/:cliente_id', authMiddleware, clienteInactivate);

export default router;
