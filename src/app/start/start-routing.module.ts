import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartPage } from './start.page';

const routes: Routes = [
  {
    path: '',
    component: StartPage
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPageRoutingModule {}
