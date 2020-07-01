import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
})

export class ProductoComponent implements OnInit {
  ngOnInit() {}
  @Input() producto: Producto = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };

  constructor(private productosService: ProductosService) {}

  agregarAlCarrito(producto) {
    this.productosService.crearCarrito(producto);
  }
}
