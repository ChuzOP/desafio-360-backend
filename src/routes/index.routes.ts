import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de listado de productos
// router.use('/productos', productRoutes);


export default router;
