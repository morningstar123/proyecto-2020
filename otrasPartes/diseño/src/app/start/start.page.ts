import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  private start=[
    {
      id:'1',
      title:'hombres',
      imageURL:'https://i.pinimg.com/originals/72/0c/e2/720ce2279433d8c91945755b65d9137b.jpg',
      Comments:['seguridad','valentia','elegancia']
      
    },
    {
      id:'2',
      title:'mujeres',
      imageURL:'https://i.ytimg.com/vi/F5vG91HEEzo/maxresdefault.jpg',
      Comments:['poder','valentia','honor']
      
    },
    {
      id:'3',
      title:'hogar',
      imageURL:'https://www.jornadacontinental.org/wp-content/uploads/2020/01/2-1.jpg',
      Comments:['seguiridad','calides','protecion']
      
    },
    {
      id:'4',
      title:'mascotas',
      imageURL:'http://videojuegosporalimentos.org/wp-content/uploads/2017/07/0013004819.jpg',
      Comments:['seguiridad','calides','protecion']
      
    }
  ]


  constructor(private menuCTRL : MenuController) { }

  ngOnInit() {
  }
 
  
    toggleMenu(){
    this.menuCTRL.toggle();

  }
}
