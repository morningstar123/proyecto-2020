import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./index/index.module").then((m) => m.IndexPageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "buscar-producto",
    loadChildren: () =>
      import("./pages/buscar-producto/buscar-producto.module").then(
        (m) => m.BuscarProductoPageModule
      ),
  },
  {
    path: "crear-producto",
    loadChildren: () =>
      import("./pages/crear-producto/crear-producto.module").then(
        (m) => m.CrearProductoPageModule
      ),
  },
  {
    path: "carrito",
    loadChildren: () =>
      import("./pages/carrito/carrito.module").then(
        (m) => m.CarritoPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
