import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/interfaces';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.page.html',
  styleUrls: ['./buscar-producto.page.scss'],
})
export class BuscarProductoPage implements OnInit {

  productos: Producto[] = [];


  constructor( private productoService: ProductosService ) { }

  ngOnInit() {

    this.productoService.getProductos()
      .subscribe( resp => {
        console.log(resp);
        this.productos.push( ...resp.productos );
      });
  }
  

}
