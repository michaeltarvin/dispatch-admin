import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Injectable()
export class UserService {

  constructor(private http: HttpClient, public router: Router) { }

  login(email: string, password: string): any {

    var formData: any = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    this.http
      .post(environment.authUrl, formData)
      .subscribe({
        next: (response) => this.loginResult(response),
        error: (error) => this.loginError(error),
      });
    return { "email": email, "password": password };
  }

  loginByToken(): any {

    this.http
      .post(environment.refreshUrl, null)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      });

    return null;
  }

  loginResult(res: any): boolean {

    if (res && res.authenticated) {
      window.localStorage.setItem("loggedIn", res.authenticated);

      window.localStorage.setItem("token", res.authorisation.token);
      window.localStorage.setItem("userId", res.user.id);
      window.localStorage.setItem("username", res.user.name);
      window.localStorage.setItem("lastlogin", moment().format());
      this.router.navigate(["/loads"]);
      return res.authenticated;
    }
    return false;
  }

  loginError(res: any) {
    console.log('loginError: ', res);
    //TODO display error
  }

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("lastlogin");
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    if (window.localStorage.getItem("loggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }

  refreshToken(result: any): any {
    if (result.Token !== "" && result.Token !== undefined) {
      window.localStorage.setItem("token", result.Token);
      window.localStorage.setItem("lastlogin", moment().toISOString());
    }
    return result;
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
