import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  inputType = 'password';
  visible = false;
  result: any;
  year: any = moment().format("YYYY");;

  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    this.result = '';
    var formData: any = new FormData();
    formData.append('email', this.form.value.email);
    formData.append('password', this.form.value.password);

    this.http
      .post(environment.authUrl, formData)
      .subscribe({
        next: (response) => {
          this.loginResult(response);
          return response;
        },
        error: (error) => {
          this.loginError(error);
          return error;
        }
      });

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
    this.result = res.error.message;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
