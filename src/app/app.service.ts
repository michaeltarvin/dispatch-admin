import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../environments/environment";
import * as moment from "moment";

@Injectable({ providedIn: 'root' })
export class AppService {
  error: EventEmitter<any> = new EventEmitter();

  private module = "MobileSubscriptions";
  private appState = {};

  constructor(private http: HttpClient, public router: Router) { }

  hrequest(handler: string, method: string, params: Array<any>): Observable<any> {
    return this.request(this.module, handler, method, params);
  }

  request(module: string, handler: string, method: string, params: Array<any>): any {

    const json = JSON.stringify({ Module: module, Handler: handler, Method: method, Parameters: params });

    const apiUrl = environment.apiUrl;

    return this.http.post(apiUrl, json, { observe: 'response' }).pipe(
      map(res => {
        this.setAuthenticationInfo(res);
        return res.body;
      }),
      catchError(this.handleError<any>(`${handler}.${method}`))
    );

  }

  setAuthenticationInfo(res: any) {
    const token = res.headers.get("token");
    if (typeof token === 'string' && token.length > 10) {
      window.localStorage.setItem("token", token);
    }
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if (error.error && error.error.Message === 'The current identity is not a BusinessIdentity. No user authenticated.') {
        this.goToRoute('/login');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setAppState(key, value) {
    this.appState[key] = value;
  }

  getAppState(key) {
    return this.appState[key];
  }

  removeFromAppState(key: string): void {
    delete this.appState[key];
  }

  reviveDateTime(value: any, includeTime: boolean): any {
    try {
      if (typeof value !== "string") return value;
      if (value.includes(".")) {
        if (includeTime) {
          return this.stringToDate(value, "DD.MM.YYYYTHH:mm:ss");
        } else {
          return this.stringToDate(value, "DD.MM.YYYY");
        }
      } else if (value.includes("-")) {
        if (includeTime) {
          return this.stringToDate(value, "YYYY-MM-DDTHH:mm:ss");
        } else {
          return this.stringToDate(value, "YYYY-MM-DD");
        }
      } else if (!value.includes(".") && value.length === 10) {
        return value;
      } else {
        return this.stringToDate(value, "YYYYMMDD");
      }
    } catch (e) {
      console.error(e.message);
    }
    return value;
  }

  goToRoute(route: string): void {
    this.router.navigate([route]);
  }

  stringToDate(value: string, format: string): Date {
    return moment(value, format).toDate();
  }


}
