import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [FiltroPipe, DomSanitizerPipe, ImagenPipe],
  exports: [FiltroPipe, DomSanitizerPipe, ImagenPipe],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
