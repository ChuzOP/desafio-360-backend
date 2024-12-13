import { Router } from 'express';
import authRoutes from './auth.routes';
import categoriaRoutes from './categoria.routes';
import estadoRoutes from './estado.routes';
import productoRoutes from './producto.routes';
import usuarioRoutes from './usuario.routes';
import clienteRoutes from './cliente.routes';
import ordenRoutes from './orden.routes';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de categorias
router.use('/categoria', categoriaRoutes);

// Rutas de estados
router.use('/estado', estadoRoutes);

// Rutas de productos
router.use('/producto', productoRoutes);

// Rutas de Usuarios
router.use('/usuario', usuarioRoutes);

// Rutas de Clientes
router.use('/cliente', clienteRoutes);

// Rutas de Ordenes
router.use('/orden', ordenRoutes);

export default router;
