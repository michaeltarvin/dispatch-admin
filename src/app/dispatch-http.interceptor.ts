import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from '../environments/environment';

@Injectable()
export class DispatchHttpInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient, public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.endsWith('/api/login') || request.url.endsWith('/api/refresh')) {
      return next.handle(this.emptyRequest(request));
    }

    if (!window.localStorage.getItem("token")) {
      return next.handle(this.emptyRequest(request));
    }

    if (this.tokenExpired()) {
      this.router.navigate(["/login"]);
    }

    if (this.requiresRefresh()) {

      if (this.refreshTokenInProgress) {
        return this.refreshTokenSubject.pipe(
          filter((result) => result),
          take(1),
          switchMap(() => next.handle(this.setAuthToken(request)))
        );
      } else {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.getNewToken().pipe(
          switchMap((token) => {
            this.refreshTokenSubject.next(token);
            this.loginResult(token);
            return next.handle(this.setAuthToken(request));
          }),
          finalize(() => (this.refreshTokenInProgress = false))
        );
      }
    } else {
      return next.handle(this.setAuthToken(request));
    }

  }

  getNewToken() {

    let token = window.localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestOptions = { headers: headers };
    return this.http.post(environment.refreshUrl, null, requestOptions);

  }

  setAuthToken(request: HttpRequest<any>): HttpRequest<any> {

    if (!window.localStorage.getItem("token"))
      return request;

    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem("token").trim()}`
      }
    });
  }

  emptyRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  }

  tokenExpired() {

    var duration = moment.duration(moment().diff(moment(window.localStorage.getItem("lastlogin"))));
    var minutes = duration.asMinutes();

    return (minutes >= environment.tokenTimeout);
  }

  requiresRefresh(): boolean {

    if (!window.localStorage.getItem("lastlogin")) {
      return true;
    }

    var duration = moment.duration(moment().diff(moment(window.localStorage.getItem("lastlogin"))));
    var minutes = duration.asMinutes();

    return (minutes >= environment.refreshTokenInMinutes);
  }

  loginResult(res: any): boolean {
    if (res && res.authenticated) {
      window.localStorage.setItem("token", res.authorisation.token);
      window.localStorage.setItem("lastlogin", moment().format());
      return res.authenticated;
    }
    return false;
  }

}
