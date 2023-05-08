import { Document, Schema, model } from 'mongoose';


export interface AsignaturaDocumentInterface extends Document {
  nombre: string;
  descripcion: string;

}

const AsignaturaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    
  },
  descripcion: {
    type: String,
    required: true,


  }
});

export const Asignatura = model<AsignaturaDocumentInterface>('Asignatura', AsignaturaSchema);
