import { Router } from 'express';
import authRoutes from './auth.routes';
import categoriaRoutes from './categoria.routes';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de categorias
router.use('/categoria', categoriaRoutes);

export default router;
