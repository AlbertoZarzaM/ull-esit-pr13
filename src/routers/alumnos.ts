import express from 'express';
import { Alumno } from '../models/alumnos.js';
import { Asignatura } from '../models/asignatura.js';

export const alumnosRouter = express.Router();

alumnosRouter.post('/alumnos', async (req, res) => {
  try {
    if(req.body.asignaturas){
      for (const asignatura of req.body.asignaturas){
        const asignaturaDB = await Asignatura.findById(asignatura);
        if(!asignaturaDB){
          return res.status(404).send({error: 'Asignatura not found'});
        }
      }
    }
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.status(201).send(alumno);

  }
  catch (error) {
    return res.status(500).send(error);
  }
});

//obtener todos los alumnos

alumnosRouter.get('/alumnos', async (req, res) => {

  try {
    const alumnos = await Alumno.find({});
    if (!alumnos) {
      return res.status(404).send();
    }
    res.send(alumnos);

  }
  catch (error) {
    return res.status(500).send(error);
  }
});


//Debe poder obtener un estudiante concreto de la base de datos según su correo electrónico.

alumnosRouter.get('/alumnos/', async (req, res) => {

  if(!req.query.email){
    return res.status(400).send({error: 'Email is required'});
  }
  try {
    const alumno = await Alumno.findOne({email: req.query.email});
    if (!alumno) {
      return res.status(404).send();
    }
    res.send(alumno);
  }
  catch (error) {
    return res.status(500).send(error);
  }
});

//Debe poder actualizar un estudiante concreto en la base de datos según su correo electrónico.

alumnosRouter.patch('/alumnos/', async (req, res) => {

  if(!req.query.email){
    return res.status(400).send({error: 'Email is required'});
  }

  const allowedUpdates = ['nombre', 'apellido', 'email', 'edad', 'asinaturas'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  if(req.body.asignaturas){
    for (const asignatura of req.body.asignaturas){
      const asignaturaDB = await Asignatura.findById(asignatura);
      if(!asignaturaDB){
        return res.status(404).send({error: 'Asignatura not found'});
      }
    }
  }





  try {
    const alumno = await Alumno.findOneAndUpdate(
      {email: req.query.email},
      req.body,
      {new: true, runValidators: true}
    );
    if (!alumno) {
      return res.status(404).send();
    }
    res.send(alumno);
  }
  catch (error) {
    return res.status(500).send(error);
  } 
});

//Debe poder eliminar un estudiante concreto de la base de datos según su correo electrónico.

alumnosRouter.delete('/alumnos/', async (req, res) => {
  try {
    const alumno = await Alumno.findOneAndDelete({email: req.query.email});
    if (!alumno) {
      return res.status(404).send();
    }
    res.send(alumno);
  }
  catch (error) {
    return res.status(500).send(error);
  }
});


alumnosRouter.get('/alumnos/:id', async (req, res) => {

  try {
    const asignaturas = await Alumno.find({asignaturas: {$all: [req.params.id]}});

    if (!asignaturas) {
      return res.status(404).send();
    }
    res.send(asignaturas);


  }
  catch (error) {
    return res.status(500).send(error);
  }
});


