import { Component, OnInit } from '@angular/core';

import {AuthData} from '../auth-data.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss','./login.css'],
})
export class LoginPage implements OnInit {
  isLoading=false;
  constructor(public authService: AuthService){}

  ngOnInit() {
  }
  
  onLogin(form: NgForm){
    if(form.invalid){
     return;
    }
    this.isLoading=true;
    this.authService.login(form.value.email,form.value.password);
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
   }

}
