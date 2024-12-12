import { Router } from 'express';
import {
    productosGetPorEstado,
    productoCreate,
    productoUpdate,
    productoUpdateEstado
} from '../controllers/producto.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, productosGetPorEstado);
router.post('/', authMiddleware, productoCreate);
router.put('/:id', authMiddleware, productoUpdate);
router.put('/estado/:id', authMiddleware, productoUpdateEstado);

export default router;