"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/Routes/RouteTipoSensor.ts
const express_1 = require("express");
const tipoSensorController_1 = require("../Controllers/tipoSensorController");
const router = (0, express_1.Router)();
router.post('/registrar', tipoSensorController_1.RegistrarTipoSensor);
router.get('/listar', tipoSensorController_1.ListarTipoSensor);
router.get('/buscar/:id', tipoSensorController_1.ObtenerTipoSensorPorId);
router.put('/actualizar/:id', tipoSensorController_1.ActualizarTipoSensor);
router.delete('/eliminar/:id', tipoSensorController_1.EliminarTipoSensor);
exports.default = router;
