// Zona principal (estructura en la base de datos)
export interface Zona {
  pk_id_zona: number;
  zon_nombre: string;
  zon_tipo_lote: string;
  zon_coor_x: number;
  zon_coor_y: number;
  fk_id_mapa: number;
}

// Respuesta del backend al crear una zona
export interface RespuestaCrearZona {
  mensaje: string;
  id: number;
}

// Respuesta del backend al actualizar una zona
export interface RespuestaActualizarZona {
  mensaje: string;
  zona: Zona;
}

// Respuesta del backend al eliminar una zona
export interface RespuestaEliminarZona {
  mensaje: string;
}
