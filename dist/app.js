"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RouteTipoSensor_1 = __importDefault(require("./Routes/RouteTipoSensor"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/tipo-sensor', RouteTipoSensor_1.default);
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
