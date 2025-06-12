import axios from 'axios';
import type {
  Zona,
  RespuestaCrearZona,
  RespuestaActualizarZona,
  RespuestaEliminarZona
} from '../interfaces/Zona'; // Asegúrate que esta ruta sea correcta

const API_URL = 'http://localhost:3000/zonas'; // Ajusta si usas otro endpoint

// Obtener todas las zonas
export async function obtenerZonas(): Promise<Zona[]> {
  const res = await axios.get<Zona[]>(`${API_URL}/listar`);
  return res.data;
}

// Crear nueva zona
export async function crearZona(
  nombre: string,
  tipoLote: string,
  coorX: number,
  coorY: number,
  idMapa: number
): Promise<number> {
  const res = await axios.post<RespuestaCrearZona>(`${API_URL}/registrar`, {
    zon_nombre: nombre,
    zon_tipo_lote: tipoLote,
    zon_coor_x: coorX,
    zon_coor_y: coorY,
    fk_id_mapa: idMapa
  });
  return res.data.id;
}

// Obtener zona por ID
export async function obtenerZonaPorId(id: number): Promise<Zona> {
  const res = await axios.get<Zona>(`${API_URL}/buscar/${id}`);
  return res.data;
}

// Actualizar zona
export async function actualizarZona(
  id: number,
  nombre: string,
  tipoLote: string,
  coorX: number,
  coorY: number,
  idMapa: number
): Promise<Zona> {
  const res = await axios.put<RespuestaActualizarZona>(`${API_URL}/actualizar/${id}`, {
    zon_nombre: nombre,
    zon_tipo_lote: tipoLote,
    zon_coor_x: coorX,
    zon_coor_y: coorY,
    fk_id_mapa: idMapa
  });
  return res.data.zona;
}

// Eliminar zona
export async function eliminarZona(id: number): Promise<string> {
  const res = await axios.delete<RespuestaEliminarZona>(`${API_URL}/eliminar/${id}`);
  return res.data.mensaje;
}
