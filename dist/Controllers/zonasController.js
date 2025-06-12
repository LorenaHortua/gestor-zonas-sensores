"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarZona = exports.actualizarZona = exports.obtenerZonaPorId = exports.obtenerZonas = exports.crearZona = void 0;
const db_1 = __importDefault(require("../Conexion/db"));
// ================================
// Crear una Zona
// ================================
const crearZona = async (req, res) => {
    try {
        const { zon_nombre, zon_tipo_lote, zon_coor_x, zon_coor_y, fk_id_mapa } = req.body;
        const query = `
      INSERT INTO zonas (
        zon_nombre, 
        zon_tipo_lote, 
        zon_coor_x, 
        zon_coor_y, 
        fk_id_mapa
      ) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING pk_id_zona
    `;
        const values = [zon_nombre, zon_tipo_lote, zon_coor_x, zon_coor_y, fk_id_mapa];
        const result = await db_1.default.query(query, values);
        res.status(201).json({
            mensaje: 'Zona creada exitosamente.',
            id: result.rows[0].pk_id_zona,
        });
    }
    catch (error) {
        console.error('Error al crear zona:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.crearZona = crearZona;
const obtenerZonas = async (_req, res) => {
    try {
        const result = await db_1.default.query('SELECT * FROM zonas');
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error al obtener zonas:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.obtenerZonas = obtenerZonas;
const obtenerZonaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query('SELECT * FROM zonas WHERE pk_id_zona = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Zona no encontrada.' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error al obtener zona por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.obtenerZonaPorId = obtenerZonaPorId;
const actualizarZona = async (req, res) => {
    const { id } = req.params;
    const { zon_nombre, zon_tipo_lote, zon_coor_x, zon_coor_y, fk_id_mapa } = req.body;
    try {
        const query = `
      UPDATE zonas 
      SET 
        zon_nombre = $1, 
        zon_tipo_lote = $2, 
        zon_coor_x = $3, 
        zon_coor_y = $4, 
        fk_id_mapa = $5
      WHERE pk_id_zona = $6
      RETURNING *;
    `;
        const values = [zon_nombre, zon_tipo_lote, zon_coor_x, zon_coor_y, fk_id_mapa, id];
        const result = await db_1.default.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Zona no encontrada.' });
        }
        res.status(200).json({
            mensaje: 'Zona actualizada exitosamente.',
            zona: result.rows[0],
        });
    }
    catch (error) {
        console.error('Error al actualizar zona:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.actualizarZona = actualizarZona;
const eliminarZona = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query('DELETE FROM zonas WHERE pk_id_zona = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Zona no encontrada.' });
        }
        res.status(200).json({ mensaje: 'Zona eliminada exitosamente.' });
    }
    catch (error) {
        console.error('Error al eliminar zona:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
exports.eliminarZona = eliminarZona;
