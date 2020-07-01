import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../interfaces/interfaces';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() productos: Producto[] = [];

  textoBuscar = '';

  constructor() { }

  ngOnInit() {
    console.log(this.productos);
  }

  buscar( event ) {
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

}
