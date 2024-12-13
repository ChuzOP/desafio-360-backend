import { Router } from 'express';
import {
    ordenesList,
    ordenCreate,
    ordenAprobar,
    ordenCancelar
} from '../controllers/orden.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, ordenesList);
router.post('/', authMiddleware, ordenCreate);
router.put('/aprobar/:orden_id', authMiddleware, ordenAprobar);
router.put('/cancelar/:orden_id', authMiddleware, ordenCancelar);

export default router;
