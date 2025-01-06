import { Router } from 'express';
import {
    ordenesList,
    ordenCreate,
    ordenAprobar,
    ordenCancelar,
    ordenesListByUsuarioId
} from '../controllers/orden.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, ordenesList);
router.get('/:usuario_id', authMiddleware, ordenesListByUsuarioId);
router.post('/', authMiddleware, ordenCreate);
router.put('/aprobar/:orden_id', authMiddleware, ordenAprobar);
router.put('/cancelar/:orden_id', authMiddleware, ordenCancelar);

export default router;
