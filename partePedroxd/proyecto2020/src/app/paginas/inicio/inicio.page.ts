import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'search',
      name: 'Buscar Producto',
      redirectTo: '/buscar-producto'
    },
    {
      icon:'add-outline',
      name: 'Subir Producto',
      redirectTo: '/crear-producto'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}
