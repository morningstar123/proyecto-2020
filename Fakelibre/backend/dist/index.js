"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const producto_1 = __importDefault(require("./routes/producto"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File UPLOAD
server.app.use(express_fileupload_1.default());
// Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app
server.app.use('/producto', producto_1.default);
//Conectar Base de Datos
mongoose_1.default.connect('mongodb+srv://Kaza:93LYvutqp7MR7Oat@cluster0-zoswr.mongodb.net/node-ionic?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('BASE DE DATOS ONLINE');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
