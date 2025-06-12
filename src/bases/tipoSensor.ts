import axios from 'axios';
import type {
  TipoSensor,
  RespuestaCrearTipoSensor,
  RespuestaActualizarTipoSensor,
  RespuestaEliminarTipoSensor
} from '../interfaces/TipoSensor'; 

const API_URL = 'http://localhost:3000/tiposensor';

// Listar todos los tipos de sensor
export async function listarTiposSensor(): Promise<TipoSensor[]> {
  const res = await axios.get<TipoSensor[]>(`${API_URL}/listar`);
  return res.data;
}

// Registrar un nuevo tipo de sensor
export async function registrarTipoSensor(
  nombre: string,
  descripcion: string,
  unidadMedida: string
): Promise<TipoSensor> {
  const res = await axios.post<RespuestaCrearTipoSensor>(`${API_URL}/registrar`, {
    tps_nombre: nombre,
    tps_descripcion: descripcion,
    tps_unidad_medida: unidadMedida
  });
  return res.data.tipo_sensor;
}

// Obtener un tipo de sensor por ID
export async function obtenerTipoSensorPorId(id: number): Promise<TipoSensor> {
  const res = await axios.get<TipoSensor>(`${API_URL}/buscar/${id}`);
  return res.data;
}

// Actualizar un tipo de sensor
export async function actualizarTipoSensor(
  id: number,
  nombre: string,
  descripcion: string,
  unidadMedida: string
): Promise<TipoSensor> {
  const res = await axios.put<RespuestaActualizarTipoSensor>(`${API_URL}/actualizar/${id}`, {
    tps_nombre: nombre,
    tps_descripcion: descripcion,
    tps_unidad_medida: unidadMedida
  });
  return res.data.tipo_sensor;
}

// Eliminar un tipo de sensor
export async function eliminarTipoSensor(id: number): Promise<string> {
  const res = await axios.delete<RespuestaEliminarTipoSensor>(`${API_URL}/eliminar/${id}`);
  return res.data.mensaje;
}
