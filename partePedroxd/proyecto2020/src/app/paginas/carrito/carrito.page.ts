import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: Producto[] = [];
  total: number = 0;

  constructor( private productosService: ProductosService ) { }

  ngOnInit( ) {

    this.carrito = this.productosService.carro;

    this.calcularTotal();

  }

  refrescar( indice ) {

    this.carrito.splice(indice, 1);

    this.total = 0;

    this.calcularTotal();

  }

  calcularTotal() {

    this.carrito.forEach(element => 

      this.total = element.precio + this.total

    );

  }


}
