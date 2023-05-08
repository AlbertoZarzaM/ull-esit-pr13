import { Document, Schema, model } from 'mongoose';
import validator from 'validator';
import { AsignaturaDocumentInterface } from './asignatura.js';

export interface AlumnoDocumentInterface extends Document {

  nombre: string;
  apellidos: string;
  edad: number;
  email: string;
  asignaturas: AsignaturaDocumentInterface[];
}

const AlumnoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,  
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  edad: {
    type: Number,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value: string) => {
        if (!validator.default.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    }
  },
  asignaturas: {
    type: [Schema.Types.ObjectId],
    ref: 'Asignatura',
    required: true,

  }
});

export const Alumno = model<AlumnoDocumentInterface>('Alumno', AlumnoSchema);

