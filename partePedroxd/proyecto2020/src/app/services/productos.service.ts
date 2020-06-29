import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaProductos, Producto } from '../interfaces/interfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  carro: Producto[] = [];

  pasarCarrito = new EventEmitter<Producto>();

  constructor( private http: HttpClient, private fileTransfer: FileTransfer ) { }

  getProductos() {

    return this.http.get<RespuestaProductos>(`${ URL }/producto`);

  }

  crearProducto( producto ) {

    this.http.post(`${URL}/producto/create`, producto).subscribe( resp => {
      console.log(resp);
    });

  }

  subirImagen( img: string ) {

    const options: FileUploadOptions = {

      fileKey: 'image',
    
            
    };

  

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${URL}/producto/upload`, options).then( data => {
      console.log(data);
    }).catch( err => {
      console.log('error en carga', err);
    });

  }

  crearCarrito( producto ) {

      this.carro.unshift(producto);

  }

 

}
