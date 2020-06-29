"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
const mongoose_1 = require("mongoose");
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, productoNombre) {
        return new mongoose_1.Promise((resolve, reject) => {
            // Crear Carpeta
            const path = this.crearCarpetaProducto(productoNombre);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    //No se pudo mover
                    reject(err);
                }
                else {
                    // todo salio bien
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaProducto(productoNombre) {
        const pathProducto = path_1.default.resolve(__dirname, '../uploads/', productoNombre);
        const pathProductoTemp = pathProducto + '/temp';
        console.log(pathProducto);
        const existe = fs_1.default.existsSync(pathProducto);
        if (!existe) {
            fs_1.default.mkdirSync(pathProducto);
            fs_1.default.mkdirSync(pathProductoTemp);
        }
        return pathProductoTemp;
    }
    imagenesDeTempHaciaProducto(productoNombre) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', productoNombre, 'temp');
        const pathProducto = path_1.default.resolve(__dirname, '../uploads/', productoNombre, 'imagenes');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathProducto)) {
            fs_1.default.mkdirSync(pathProducto);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(productoNombre);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathProducto}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(productoNombre) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', productoNombre, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(nombre, imagen) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', nombre, 'imagenes', imagen);
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/original.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
