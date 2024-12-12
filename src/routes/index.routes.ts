import { Router } from 'express';
import authRoutes from './auth.routes';
import categoriaRoutes from './categoria.routes';
import estadoRoutes from './estado.routes';
import productoRoutes from './producto.routes';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de categorias
router.use('/categoria', categoriaRoutes);

// Rutas de estados
router.use('/estado', estadoRoutes);

// Rutas de productos
router.use('/producto', productoRoutes);

export default router;
