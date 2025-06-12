// src/Routes/RouteTipoSensor.ts
import { Router } from 'express';
import {
  ListarTipoSensor,
  ObtenerTipoSensorPorId,
  ActualizarTipoSensor,
  EliminarTipoSensor,
  RegistrarTipoSensor
} from '../Controllers/tipoSensorController';

const router = Router();

router.post('/registrar', RegistrarTipoSensor);
router.get('/listar', ListarTipoSensor);
router.get('/buscar/:id', ObtenerTipoSensorPorId);
router.put('/actualizar/:id', ActualizarTipoSensor);
router.delete('/eliminar/:id', EliminarTipoSensor);

export default router;
