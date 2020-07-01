import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// libreria de plugins de Capacitor incluyendo la camara
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
 
// DomSanitizer para sanitizar las url de las fotos
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var window: any;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  tempImages: SafeResourceUrl[] = [];

  producto = {
    nombre: '',
    descripcion: '',
    marca: '',
    precio: ''
  }


  constructor( private productosService: ProductosService, private route: Router, private camera: Camera, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  libreria() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  }


  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

       const img = window.Ionic.WebView.convertFileSrc( imageData );

      this.productosService.subirImagen( imageData );
      this.tempImages.push( img );

     }, (err) => {
      // Handle error
     });
  }


  async crearProducto(){
    console.log(this.producto);
    const creado = await this.productosService.crearProducto( this.producto );

    this.tempImages = [];
    
    this.route.navigateByUrl('/inicio');

    
  }

}
