import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.sessionService.isLoggedUser())
      return true;
    this.router.navigate(["/login"])
    return false;
  }

}
