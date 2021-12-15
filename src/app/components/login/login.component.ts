import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatSpinner } from "@angular/material/progress-spinner";
import { FieldConfig } from "../../models/FieldConfig";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormControlNames, InputTypes, PageRoutes, TOKEN_NAME } from "../../constant/const";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { SpinnerService } from "../../service/spinner-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarUtil } from "../../util/snackbar-util";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {

  @ViewChild("spinner") spinner!: MatSpinner;

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  usernameInputConfig: FieldConfig = {
    type: InputTypes.TEXT,
    name: FormControlNames.USERNAME_NAME_FORM_CONTROL,
    label: "Username"
  };
  passwordInputConfig: FieldConfig = {
    type: InputTypes.PASSWORD,
    name: FormControlNames.PASSWORD_NAME_FORM_CONTROL,
    label: "Password"
  };


  constructor(private authService: AuthService, private router: Router, private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  auth(): void {
    this.spinnerService.show(this.spinner);
    this.authService.auth(this.loginForm.getRawValue()).subscribe(async (token) => {
      sessionStorage.setItem(TOKEN_NAME, token);
      this.spinnerService.hide(this.spinner);
      await this.router.navigate([PageRoutes.ADMIN]);
    }, (err: HttpErrorResponse) => {
      SnackBarUtil.openSnackBar(this.snackBar, JSON.parse(err.error).message);
      this.spinnerService.hide(this.spinner);
    });
  }
}
