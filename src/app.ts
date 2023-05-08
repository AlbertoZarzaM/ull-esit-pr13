import express from 'express';
import './db/mongoose.js';
import { asignaturaRouter } from './routers/asignatura.js';
import { alumnosRouter } from './routers/alumnos.js'
import { defaultRouter } from './routers/default.js';

export const app = express();
app.use(express.json());
app.use(asignaturaRouter);
app.use(alumnosRouter);
app.use(defaultRouter);
