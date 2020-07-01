import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ComponentRoutingModule } from './component-routing.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ProductosComponent } from "./productos/productos.component";
import { ProductoComponent } from "./producto/producto.component";
import { PipesModule } from "../pipes/pipes.module";




@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent,HeaderComponent,SidemenuComponent, ProductosComponent, ProductoComponent],
  exports:[SlidesComponent, StartComponent, LogoComponent,HeaderComponent,SidemenuComponent, ProductosComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentRoutingModule,
    PipesModule
    
   
  ]
})
export class ComponentsModule { }
