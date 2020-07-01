import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/pages/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit,OnDestroy { 
  
  constructor(private menu: MenuController,private authService: AuthService) { }
  userIsAuthenticated = false;
  private authListenerSubs:Subscription;
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  async openMenu() {
    await this.menu.open();
  }
 
  ngOnInit(){
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs= this.authService
      .getauthStatusListener()
      .subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
      });
    }
    ngOnDestroy(){
  
    }
    onLogout(){
      this.authService.logout();
    }

}
