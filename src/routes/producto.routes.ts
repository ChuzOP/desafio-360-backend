import { Router } from 'express';
import {
    productosGetPorEstado,
    productoCreate,
    productoUpdate,
    productosGetById,
} from '../controllers/producto.controller';
import { authMiddleware } from '../middlewares';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', authMiddleware, productosGetPorEstado);
router.post('/', [authMiddleware, upload.single('imagen')], productoCreate);
router.get('/:id', authMiddleware, productosGetById);
router.put('/:id', [authMiddleware, upload.single('imagen')], productoUpdate);

export default router;