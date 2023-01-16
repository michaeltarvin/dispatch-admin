import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  form: UntypedFormGroup;

  inputType = 'password';
  visible = false;
  userId: number;
  user: any;
  result: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    //{value: this.user.name, disabled: true}
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, { validators: this.checkPasswords });

    this.route.queryParams
      .subscribe(params => {
        this.userId = params.userId;
      }
      );

    this.http
      .get(`${environment.apiUrl}user/${this.userId}`)
      .subscribe({
        next: (response) => {
          this.user = response;
          this.form = this.fb.group({
            name: [{ value: this.user.name, disabled: true }, Validators.required],
            email: [{ value: this.user.email, disabled: true }, Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
          }, { validators: this.checkPasswords });
          return response;
        },
        error: (error) => {
          console.error(error)
          return error;
        }
      });
  }

  send() {
    this.result = '';
    var formData: any = new FormData();
    formData.append('id', this.userId);
    formData.append('name', this.form.controls.name.value);
    formData.append('email', this.form.controls.email.value);
    formData.append('password', this.form.value.password);

    this.http
      .post(environment.registerUrl, formData)
      .subscribe({
        next: (response) => {
          this.loginResult(response);
        },
        error: (error) => {
          console.error(error);
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

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
