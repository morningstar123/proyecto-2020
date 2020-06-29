import Server from './clases/server';
import mongoose from 'mongoose';
import productoRoutes from './routes/producto';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const server = new Server();

//Body parser

server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// File UPLOAD

server.app.use( fileUpload() );

// Configurar CORS
server.app.use( cors( { origin: true, credentials: true } ) );



// Rutas de mi app

server.app.use('/producto', productoRoutes)

//Conectar Base de Datos
mongoose.connect('mongodb://localhost:27017/proyecto2020',
                {useNewUrlParser: true, useCreateIndex: true}, ( err ) => {
    
    if ( err ) throw err;

    console.log('BASE DE DATOS ONLINE');
})


// Levantar express

server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});