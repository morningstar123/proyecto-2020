import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading=false;
  constructor(public authService: AuthService) { };

  ngOnInit() {
  }
  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    this.authService.createUser(form.value.email,form.value.password);
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
   }
}
