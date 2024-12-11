import { Router } from 'express';
import { categoriasGetAll } from '../controllers/categoria.controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware, categoriasGetAll);

export default router;
