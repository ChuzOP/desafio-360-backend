import { Router } from 'express';
import {
    estadosGetAll,
    estadoCreate,
    estadoUpdate
} from '../controllers/estado.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, estadosGetAll);
router.post('/', authMiddleware, estadoCreate);
router.put('/:id', authMiddleware, estadoUpdate);

export default router;
