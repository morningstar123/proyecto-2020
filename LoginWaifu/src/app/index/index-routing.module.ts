import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';
import { IndexRouter } from './index.router';



@NgModule({
  imports: [IndexRouter],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
