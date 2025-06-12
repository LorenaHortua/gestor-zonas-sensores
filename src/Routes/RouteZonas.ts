import { Router } from 'express';
import {
  crearZona,
  obtenerZonas,
  obtenerZonaPorId,
  actualizarZona,
  eliminarZona
} from '../Controllers/zonasController';

const router = Router();

// Rutas CRUD para zonas
router.post('/registrar', crearZona);
router.get('/listar', obtenerZonas);
router.get('/buscar/:id', obtenerZonaPorId);
router.put('/actualizar/:id', actualizarZona);
router.delete('/eliminar/:id', eliminarZona);

export default router;
