"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_model_1 = require("../models/producto.model");
const file_system_1 = __importDefault(require("../clases/file-system"));
const productoRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
// Obtener Productos
productoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield producto_model_1.Producto.find().exec();
    res.json({
        ok: true,
        productos
    });
}));
// CREAR Producto
productoRoutes.post('/create', (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        precio: req.body.precio
    };
    const imagenes = fileSystem.imagenesDeTempHaciaProducto(req.body.nombre);
    producto.imagen = imagenes;
    // Insercion en la BD
    producto_model_1.Producto.create(producto).then(productoDB => {
        res.json({
            ok: true,
            producto: productoDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Servicio para subir imagenes
productoRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
    /*  const productoNombre = req.body.nombre; */
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.body.nombre);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
productoRoutes.get('/imagen/:nombre/:imagen', (req, res) => {
    const nombre = req.params.nombre;
    const imagen = req.params.imagen;
    const pathFoto = fileSystem.getFotoUrl(nombre, imagen);
    res.sendFile(pathFoto);
});
exports.default = productoRoutes;
