import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarProductoPageRoutingModule } from './buscar-producto-routing.module';

import { BuscarProductoPage } from './buscar-producto.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarProductoPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [BuscarProductoPage]
})
export class BuscarProductoPageModule {}
