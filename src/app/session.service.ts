import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }


  isLoggedUser() {
    if(localStorage.getItem("isLogged")==="true"){
      return true;
    }
    return false;
  }

  login(username: string, password: string) {
    //kiedy backend bedzie gotowy trzeba bedzie wyslac login i haslo
    localStorage.setItem("isLogged", "true");
    this.router.navigateByUrl("/kursy");
  }

  logout(){
    localStorage.removeItem("isLogged");
    this.router.navigateByUrl("/login");

  }
}
