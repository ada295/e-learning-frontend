import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

class Role {
  authority: string | undefined;
}

class AuthResponse {
  error: boolean | undefined;
  token: string | undefined;
  role: Role[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }


  isLoggedUser() {
    if (localStorage.getItem("isLogged") === "true") {
      return true;
    }
    return false;
  }

  login(username: any, password: any) {
    //kiedy backend bedzie gotowy trzeba bedzie wyslac login i haslo
    this.httpClient.post<AuthResponse>("http://localhost:8080/auth/login", {
      email: username, password: password
    }).pipe(catchError(this.handleError)
    ).subscribe((response) => {
      if (response.error == true) {
      } else if (response.token && response.role[0].authority) {
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", "ROLE_" + response.role[0].authority);
        this.router.navigateByUrl("/kursy");
      }
    });
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
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");

  }

  private handleError(error: HttpErrorResponse) {
    alert("Błędne dane logowania!");
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
