import { Schema, model, Document } from 'mongoose';

// Esquema del producto en la BD

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    imagen: [{
        type: String
        /* default: 'av-1.png' */
    }],
    marca: {
        type: String,
        required: [true, 'La marca es necesaria']
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number
    }
});

interface IProducto extends Document {
    nombre: string;
    imagen: string;
    marca: string;
    descripcion: string;
    precio: number;
}

export const Producto = model<IProducto>('Producto', productoSchema);