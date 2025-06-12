const app = document.getElementById('app'); 

if (app) {
  app.innerHTML = `
    <style>
      .formularios {
        display: flex;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
        padding: 20px;
      }
      .form-container {
        background-color: #f2fff4;
        padding: 20px;
        border-radius: 12px;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        font-family: sans-serif;
      }
      label {
        display: block;
        margin-top: 10px;
        color: #00471b;
      }
      input {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      button {
        margin-top: 10px;
        background-color: #006d2c;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
      button:hover {
        background-color: #00471b;
      }
      .mensaje {
        margin-top: 10px;
        font-weight: bold;
        color: #006d2c;
      }
      .resultados {
        margin-top: 20px;
        background-color: #e8f5e9;
        padding: 10px;
        border-radius: 8px;
      }
      .resultados div {
        margin-bottom: 10px;
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
    </style>

    <div class="formularios">
      <!-- Registro de Zona -->
      <div class="form-container">
        <h2>Registrar Zona</h2>
        <form id="zona-form">
          <label>Nombre:</label>
          <input type="text" id="nombre" required />
          <label>Tipo de Lote:</label>
          <input type="text" id="tipo" required />
          <label>Coordenada X:</label>
          <input type="number" id="x" step="any" required />
          <label>Coordenada Y:</label>
          <input type="number" id="y" step="any" required />
          <label>ID del Mapa:</label>
          <input type="number" id="mapa" required />
          <button type="submit">Registrar Zona</button>
          <button type="button" id="listar-zonas">Listar Zonas</button>
          <input type="number" id="buscar-zona-id" placeholder="ID a buscar" />
          <button type="button" id="buscar-zona">Buscar Zona</button>
          <input type="number" id="eliminar-zona-id" placeholder="ID a eliminar" />
          <button type="button" id="eliminar-zona">Eliminar Zona</button>
          <div class="mensaje" id="mensaje-zona"></div>
          <div class="resultados" id="resultado-zonas"></div>
        </form>
      </div>

      <!-- Registro de Tipo Sensor -->
      <div class="form-container">
        <h2>Registrar Tipo de Sensor</h2>
        <form id="sensor-form">
          <label>Nombre:</label>
          <input type="text" id="tps_nombre" required />
          <label>Descripción:</label>
          <input type="text" id="tps_descripcion" required />
          <label>Unidad de Medida:</label>
          <input type="text" id="tps_unidad" required />
          <button type="submit">Registrar Tipo Sensor</button>
          <button type="button" id="listar-sensores">Listar Tipos Sensor</button>
          <input type="number" id="buscar-sensor-id" placeholder="ID a buscar" />
          <button type="button" id="buscar-sensor">Buscar Sensor</button>
          <input type="number" id="eliminar-sensor-id" placeholder="ID a eliminar" />
          <button type="button" id="eliminar-sensor">Eliminar Sensor</button>
          <div class="mensaje" id="mensaje-sensor"></div>
          <div class="resultados" id="resultado-sensores"></div>
        </form>
      </div>
    </div>
  `;
}
  // Interfaces
  interface Zona {
    id: number;
    zon_nombre: string;
    zon_tipo_lote: string;
    zon_coor_x: number;
    zon_coor_y: number;
    fk_id_mapa: number;
  }

  interface TipoSensor {
    id: number;
    tps_nombre: string;
    tps_descripcion: string;
    tps_unidad_medida: string;
  }

  // Zona
  const zonaForm = document.getElementById('zona-form') as HTMLFormElement;
  const mensajeZona = document.getElementById('mensaje-zona') as HTMLDivElement;
  const resultadoZonas = document.getElementById('resultado-zonas') as HTMLDivElement;

  zonaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datosZona = {
      zon_nombre: (document.getElementById('nombre') as HTMLInputElement).value,
      zon_tipo_lote: (document.getElementById('tipo') as HTMLInputElement).value,
      zon_coor_x: parseFloat((document.getElementById('x') as HTMLInputElement).value),
      zon_coor_y: parseFloat((document.getElementById('y') as HTMLInputElement).value),
      fk_id_mapa: parseInt((document.getElementById('mapa') as HTMLInputElement).value)
    };
    try {
      const res = await fetch('http://localhost:3000/zonas/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosZona)
      });
      const data = await res.json();
      mensajeZona.textContent = data.id ? `Zona registrada. ID: ${data.id}` : 'Error al registrar zona.';
      zonaForm.reset();
    } catch {
      mensajeZona.textContent = 'Error en la conexión';
    }
  });

  document.getElementById('listar-zonas')?.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/zonas/listar');
    const zonas: Zona[] = await res.json();
    resultadoZonas.innerHTML = zonas.map(z => `
      <div>
      <strong>ID:</strong> ${z.id}<br>
      <strong>Nombre:</strong> ${z.zon_nombre}<br>
      <strong>Tipo de Lote:</strong> ${z.zon_tipo_lote}<br>
      <strong>Coordenada X:</strong> ${z.zon_coor_x}<br>
      <strong>Coordenada Y:</strong> ${z.zon_coor_y}<br>
      <strong>ID del Mapa:</strong> ${z.fk_id_mapa}
      </div>
    `).join('');
  });

  document.getElementById('buscar-zona')?.addEventListener('click', async () => {
    const id = (document.getElementById('buscar-zona-id') as HTMLInputElement).value;
     if (!id) return;
     const res = await fetch(`http://localhost:3000/zonas/buscar/${id}`);
     const z: Zona = await res.json();
     resultadoZonas.innerHTML = `
     <div>
     <strong>ID:</strong> ${z.id}<br>
     <strong>Nombre:</strong> ${z.zon_nombre}<br>
     <strong>Tipo de Lote:</strong> ${z.zon_tipo_lote}<br>
     <strong>Coordenada X:</strong> ${z.zon_coor_x}<br>
     <strong>Coordenada Y:</strong> ${z.zon_coor_y}<br>
     <strong>ID del Mapa:</strong> ${z.fk_id_mapa}
     </div>
  `;
});


  document.getElementById('eliminar-zona')?.addEventListener('click', async () => {
    const id = (document.getElementById('eliminar-zona-id') as HTMLInputElement).value;
    if (!id) return;
    await fetch(`http://localhost:3000/zonas/eliminar/${id}`, { method: 'DELETE' });
    mensajeZona.textContent = `Zona ID ${id} eliminada`;
  });

  // Sensor
  const sensorForm = document.getElementById('sensor-form') as HTMLFormElement;
  const mensajeSensor = document.getElementById('mensaje-sensor') as HTMLDivElement;
  const resultadoSensores = document.getElementById('resultado-sensores') as HTMLDivElement;

  sensorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datosSensor = {
      tps_nombre: (document.getElementById('tps_nombre') as HTMLInputElement).value,
      tps_descripcion: (document.getElementById('tps_descripcion') as HTMLInputElement).value,
      tps_unidad_medida: (document.getElementById('tps_unidad') as HTMLInputElement).value
    };
    const res = await fetch('http://localhost:3000/tiposensor/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosSensor)
    });
    const data = await res.json();
    mensajeSensor.textContent = data.tipo_sensor ? `Registrado: ${data.tipo_sensor.tps_nombre}` : 'Error al registrar tipo sensor';
    sensorForm.reset();
  });

  document.getElementById('listar-sensores')?.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/tiposensor/listar');
    const sensores: TipoSensor[] = await res.json();
    resultadoSensores.innerHTML = sensores.map(s => `
       <div>
        <strong>ID:</strong> ${s.id}<br>
        <strong>Nombre:</strong> ${s.tps_nombre}<br>
        <strong>Descripción:</strong> ${s.tps_descripcion}<br>
        <strong>Unidad de Medida:</strong> ${s.tps_unidad_medida}
        </div>
    `).join('');
  });
  
  
  document.getElementById('buscar-sensor')?.addEventListener('click', async () => {
     const id = (document.getElementById('buscar-sensor-id') as HTMLInputElement).value;
     if (!id) return;
     const res = await fetch(`http://localhost:3000/tiposensor/buscar/${id}`);
     const s: TipoSensor = await res.json();
     resultadoSensores.innerHTML = `
     <div>
     <strong>ID:</strong> ${s.id}<br>
     <strong>Nombre:</strong> ${s.tps_nombre}<br>
     <strong>Descripción:</strong> ${s.tps_descripcion}<br>
     <strong>Unidad de Medida:</strong> ${s.tps_unidad_medida}
     </div>
     `;
  });


  document.getElementById('eliminar-sensor')?.addEventListener('click', async () => {
    const id = (document.getElementById('eliminar-sensor-id') as HTMLInputElement).value;
    if (!id) return;
    await fetch(`http://localhost:3000/tiposensor/eliminar/${id}`, { method: 'DELETE' });
    mensajeSensor.textContent = `Sensor ID ${id} eliminado`;
  });
