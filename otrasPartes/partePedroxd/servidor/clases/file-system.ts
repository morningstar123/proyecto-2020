import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';
import { Promise } from 'mongoose';

export default class FileSystem {

    constructor() {};

        guardarImagenTemporal( file: FileUpload, productoNombre: string ) {

            return new Promise( (resolve: any, reject: any) => {

                // Crear Carpeta
            const path = this.crearCarpetaProducto( productoNombre );

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico( file.name );

            // Mover el archivo del Temp a nuestra carpeta
            file.mv( `${path}/${nombreArchivo}`, (err: any) => {

                if ( err ) {
                    //No se pudo mover
                    reject(err);
                } else {
                    // todo salio bien
                    resolve();
                }

            });

            });

            

        }

        private generarNombreUnico( nombreOriginal: String ) {

            const nombreArr = nombreOriginal.split('.');
            const extension = nombreArr[ nombreArr.length -1 ];

            const idUnico = uniqid();

            return `${idUnico}.${extension}`;

        }

        private crearCarpetaProducto( productoNombre: string ) {

            const pathProducto = path.resolve( __dirname, '../uploads/', productoNombre );
            const pathProductoTemp = pathProducto + '/temp';
            console.log(pathProducto);

            const existe = fs.existsSync( pathProducto );

            if ( !existe ) {
                fs.mkdirSync( pathProducto );
                fs.mkdirSync( pathProductoTemp );
            }

            return pathProductoTemp;

        }

        imagenesDeTempHaciaProducto ( productoNombre: string ) {

            const pathTemp = path.resolve( __dirname, '../uploads/', productoNombre, 'temp' );
            const pathProducto = path.resolve( __dirname, '../uploads/', productoNombre, 'imagenes' );

            if ( !fs.existsSync( pathTemp ) ) {
                return [];
            }

            if ( !fs.existsSync( pathProducto ) ) {
                fs.mkdirSync( pathProducto );
            }

            const imagenesTemp = this.obtenerImagenesEnTemp( productoNombre );

            imagenesTemp.forEach( imagen => {
                fs.renameSync( `${pathTemp}/${imagen}`, `${pathProducto}/${imagen}` )
            });

            return imagenesTemp;

        }

        private obtenerImagenesEnTemp( productoNombre: string ) {

            const pathTemp = path.resolve( __dirname, '../uploads/', productoNombre, 'temp' );

            return fs.readdirSync( pathTemp ) || [];

        }

        getFotoUrl( nombre: string , imagen: string) {

            const pathFoto = path.resolve(__dirname, '../uploads', nombre, 'imagenes', imagen );

            const existe = fs.existsSync( pathFoto );

            if(!existe) {
               return path.resolve(__dirname, '../assets/original.jpg');
            }

            return pathFoto;

        }


    

}