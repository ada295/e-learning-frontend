import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) {
  }


  isLoggedUser() {
    if (localStorage.getItem("isLogged") === "true") {
      return true;
    }
    return false;
  }

  login(username: any, password: any) {
    //kiedy backend bedzie gotowy trzeba bedzie wyslac login i haslo
    localStorage.setItem("isLogged", "true");
    if (username == "teacher" && password == "teacher") {
      localStorage.setItem("role", "ROLE_TEACHER");
    } else if (username == "student" && password == "student") {
      localStorage.setItem("role", "ROLE_STUDENT");
    } else if (username == "admin" && password == "admin") {
      localStorage.setItem("role", "ROLE_ADMIN");
    }


    this.router.navigateByUrl("/kursy");
  }

  isStudent() {
    return localStorage.getItem("role") == "ROLE_STUDENT";
  }

  isTeacher() {
    return localStorage.getItem("role") == "ROLE_TEACHER";
  }

  isAdmin() {
    return localStorage.getItem("role") == "ROLE_ADMIN";
  }


  logout() {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role");
    this.router.navigateByUrl("/login");

  }
}
