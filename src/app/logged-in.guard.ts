import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import * as moment from "moment";
import { environment } from '../environments/environment';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    public router: Router,
    public appService: AppService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!route) {
      console.error('no route provided to activate.');
    }

    if (this.isLoggedIn() === false) {
      this.router.navigate(["/login"]);
      return false;
    }

    if (this.checkUserToken()) {
      if (state && state.url) {
        if (state.url === "/noaccess" || state.url === "/") {
          return true;
        }
      }
    }
    return true;
  }

  checkUserToken(): boolean {

    //TODO: find out if this is needed, or just let http intercept handle it
    // if (this.requiresTokenCheck()) {
    //     return false;
    // }
    return true;
  }

  isLoggedIn(): boolean {
    if (window.localStorage.getItem("loggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }

  requiresTokenCheck(): boolean {

    const lastlogin = window.localStorage.getItem("lastlogin");

    if (!lastlogin) return true;

    if (moment().add(environment.tokenTimeout, "minutes").isAfter(moment(lastlogin))) {
      return false;
    }

    return true;
  }

}
