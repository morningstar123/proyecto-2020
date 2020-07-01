import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  componentes: Componente[] = [
    {
      icon: "search",
      name: "Buscar Producto",
      redirectTo: "/buscar-producto",
    },
    {
      icon: "add-outline",
      name: "Subir Producto",
      redirectTo: "/crear-producto",
    },
  ];
  private start = [
    {
      id: "1",
      title: "hombres",
      imageURL:
        "https://i.pinimg.com/originals/72/0c/e2/720ce2279433d8c91945755b65d9137b.jpg",
      Comments: ["seguridad", "valentia", "elegancia"],
    },
    {
      id: "2",
      title: "mujeres",
      imageURL: "https://i.ytimg.com/vi/F5vG91HEEzo/maxresdefault.jpg",
      Comments: ["poder", "valentia", "honor"],
    },
    {
      id: "3",
      title: "hogar",
      imageURL:
        "https://www.jornadacontinental.org/wp-content/uploads/2020/01/2-1.jpg",
      Comments: ["seguiridad", "calides", "protecion"],
    },
    {
      id: "4",
      title: "mascotas",
      imageURL:
        "http://videojuegosporalimentos.org/wp-content/uploads/2017/07/0013004819.jpg",
      Comments: ["seguiridad", "calides", "protecion"],
    },
  ];

  constructor() {}

  ngOnInit() {}
}

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}

