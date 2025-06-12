import type { Request, Response } from 'express';
import pool from '../Conexion/db';

export const crearZona = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('➡️ Datos recibidos para registrar zona:', req.body);
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
      RETURNING pk_id_zona;
    `;

    const values = [zon_nombre, zon_tipo_lote, zon_coor_x, zon_coor_y, fk_id_mapa];
    const result = await pool.query(query, values);

    res.status(201).json({
      mensaje: 'Zona creada exitosamente.',
      id: result.rows[0].pk_id_zona
    });
  } catch (error) {
    console.error('Error al crear zona:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const obtenerZonas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM zonas');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const obtenerZonaPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM zonas WHERE pk_id_zona = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Zona no encontrada.' });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener zona por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const actualizarZona = async (req: Request, res: Response): Promise<void> => {
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
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Zona no encontrada.' });
      return;
    }

    res.status(200).json({
      mensaje: 'Zona actualizada exitosamente.',
      zona: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar zona:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const eliminarZona = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM zonas WHERE pk_id_zona = $1', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Zona no encontrada.' });
      return;
    }

    res.status(200).json({ mensaje: 'Zona eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar zona:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

