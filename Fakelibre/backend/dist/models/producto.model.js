"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema del producto en la BD
const productoSchema = new mongoose_1.Schema({
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
exports.Producto = mongoose_1.model('Producto', productoSchema);
