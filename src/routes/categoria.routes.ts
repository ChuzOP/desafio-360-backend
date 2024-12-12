import { Router } from 'express';
import {
    categoriaCreate,
    categoriasGetAll,
    categoriaUpdate,
    updateCategoriaEstado
} from '../controllers/categoria.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, categoriasGetAll);
router.post('/', authMiddleware, categoriaCreate);
router.put('/:id', authMiddleware, categoriaUpdate);
router.put('/estado/:id', authMiddleware, updateCategoriaEstado);

export default router;
