import { Router } from 'express';
import {
    categoriaCreate,
    categoriasGetAll,
    categoriasGetById,
    categoriaUpdate,
} from '../controllers/categoria.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, categoriasGetAll);
router.post('/', authMiddleware, categoriaCreate);
router.get('/:id', authMiddleware, categoriasGetById);
router.put('/:id', authMiddleware, categoriaUpdate);

export default router;
