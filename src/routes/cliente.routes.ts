import { Router } from 'express';
import {
    clientesGetAll,
    clienteUpdate
} from '../controllers/cliente.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, clientesGetAll);
router.put('/:cliente_id', authMiddleware, clienteUpdate);

export default router;
