import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

/*
Este codigo se encarga de todos los servicios en relación a:
Login-Creación de usuarios-JsonWebToken y autentificación de usuario
en el Frontend de angular utilizando suscripciones a sujetos.
::::auth-data.model contiene los datos requeridos que se validan con el javascript de angular
*/

@Injectable({providedIn:"root"})
export class AuthService{
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>()

  constructor(private http:HttpClient, private router: Router){

  };

  getToken(){
    return this.token;
  }

  getauthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email:string,password:string){
    const authData: AuthData ={
      email: email,
      password:password
    };
    this.http.post("http://localhost:3000/api/user/signup",authData).
    subscribe(response =>{
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  login(email:string, password: string){
    const authData: AuthData ={
      email: email,
      password:password
    };
    this.http.post<{token: string,expiresIn:number}>("http://localhost:3000/api/user/login",authData).
    subscribe(response =>{
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
        this.saveAuthData(token,expirationDate);
        this.router.navigate(['/home']);
      }
    })
  };

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation,expiresIn);
    if(expiresIn>0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/home']);
    this.clearAtuhData();
    clearTimeout(this.tokenTimer);
  }
  
  private saveAuthData( token:string,expirationDate: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAtuhData(){
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    }

  private getAuthData(){
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expiration");
      if(!token || !expirationDate){
        return;
      }
      return {
        token:token,
        expirationDate: new Date(expirationDate)
      }
    }

  private setAuthTimer(duration: number){
      this.tokenTimer = setTimeout(()=>{

        this.logout();
      },duration*1000);
    }
}
