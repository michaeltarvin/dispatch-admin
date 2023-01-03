import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
//import { UserService } from './pages/authentication/login//user.service';
import * as moment from "moment";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    //public user: UserService,
    public router: Router,
    public appService: AppService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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

    if (this.requiresTokenCheck()) {
      // this.user.loginByToken().subscribe((result) => {
      //   if (result.Token === "" || result.Token === undefined) {
      //     window.localStorage.removeItem("token");
      //     window.localStorage.removeItem("loggedIn");
      //     this.router.navigate(["/login"]);
      //     return false;
      //   }
      // });
    }
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

    if (moment().add(60, "minutes").isAfter(moment(lastlogin))) {
      return false;
    }

    return true;
  }

}
