// Estructura principal del tipo de sensor
export interface TipoSensor {
  pk_id_tipo_sensor: number;
  tps_nombre: string;
  tps_descripcion: string;
  tps_unidad_medida: string;
}

// Respuesta del backend al crear
export interface RespuestaCrearTipoSensor {
  tipo_sensor: TipoSensor;
}

// Respuesta del backend al actualizar
export interface RespuestaActualizarTipoSensor {
  tipo_sensor: TipoSensor;
}

// Respuesta del backend al eliminar
export interface RespuestaEliminarTipoSensor {
  mensaje: string;
}

