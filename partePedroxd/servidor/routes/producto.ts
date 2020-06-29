import { Router, Request, Response } from 'express';
import { Producto } from '../models/producto.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../clases/file-system';

const productoRoutes = Router();
const fileSystem = new FileSystem();

// Obtener Productos

productoRoutes.get('/', async ( req:any, res: Response ) => {

    const productos = await Producto.find().exec();

    res.json({
        ok:true,
        productos
    });
});


// CREAR Producto
productoRoutes.post('/create', (req: any, res: Response) =>{

    const producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        precio: req.body.precio
    }

    const imagenes = fileSystem.imagenesDeTempHaciaProducto( req.body.nombre );
    producto.imagen = imagenes;

    // Insercion en la BD
    Producto.create( producto ).then( productoDB => {

        res.json({
            ok: true,
            producto: productoDB
        });

    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });

});

// Servicio para subir imagenes

productoRoutes.post('/upload', async (req: any, res: Response) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;
   /*  const productoNombre = req.body.nombre; */

    if ( !file ) {
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

    await fileSystem.guardarImagenTemporal( file, req.body.nombre );


    res.json({
        ok: true,
        file: file.mimetype
    });
});


productoRoutes.get('/imagen/:nombre/:imagen', (req: any, res: Response) => {

    const nombre = req.params.nombre;
    const imagen = req.params.imagen;

    const pathFoto = fileSystem.getFotoUrl(nombre,imagen);

    res.sendFile( pathFoto );
});

export default productoRoutes;