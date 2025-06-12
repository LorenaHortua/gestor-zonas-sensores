import express from 'express';
import cors from 'cors';
import tipoSensor from './Routes/RouteTipoSensor';
import zonas from './Routes/RouteZonas';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/tiposensor', tipoSensor);
app.use('/zonas', zonas);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
