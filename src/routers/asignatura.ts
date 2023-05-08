import express from 'express';
import { Asignatura } from '../models/asignatura.js';
import { Alumno } from '../models/alumnos.js';

export const asignaturaRouter = express.Router();

asignaturaRouter.post('/asignaturas', async (req, res) => {
  try{
    const asignatura = new Asignatura(req.body);
    await asignatura.save();
    res.status(201).send(asignatura);
  }
  catch (error) {
    return res.status(500).send(error);
  }
});

//obtener todas las asignaturas

asignaturaRouter.get('/asignaturas', async (req, res) => {
  try{
    const asignaturas = await Asignatura.find({});
    if(!asignaturas){
      return res.status(404).send();
    }
    res.send(asignaturas);
  }
  catch (error) {
    return res.status(500).send(error);
  }
});


// obtener, modificar y borrar una asignatura por su identificador único.

asignaturaRouter.get('/asignaturas/:id', async (req, res) => {
  
  try{
    const asignatura = await Asignatura.findById(req.params.id);
    if(!asignatura){
      return res.status(404).send();
    }
    res.send(asignatura);
  }
  catch (error) {
    return res.status(500).send(error);
  }
});

asignaturaRouter.patch('/asignaturas/:id', async (req, res) => {

  const allowedUpdates = ['nombre', 'descripcion'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Update is not permitted',
      });
    }

    try {
      const asignatura = await Asignatura.findByIdAndUpdate({
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true
      });
      if (!asignatura) {
        return res.status(404).send();
      }
      res.send(asignatura);
    } catch (error) {
      return res.status(500).send(error);
    }
});

asignaturaRouter.delete('/asignaturas/:id', async (req, res) => {

  try {
    const asignatura = await Asignatura.findByIdAndDelete(req.params.id);
    if (!asignatura) {
      return res.status(404).send();
    }
    res.send(asignatura);
  } catch (error) {
    return res.status(500).send(error);
  }
});








