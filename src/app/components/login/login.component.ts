import {ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FieldConfig} from '../../models/FieldConfig';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormControlNames, InputTypes, TOKEN_NAME} from '../../constant/const';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  usernameInputConfig: FieldConfig = {type: InputTypes.TEXT, name: FormControlNames.USERNAME_NAME_FORM_CONTROL};
  passwordInputConfig: FieldConfig = {type: InputTypes.PASSWORD, name: FormControlNames.PASSWORD_NAME_FORM_CONTROL};


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  auth(): void {
    this.authService.auth(this.loginForm.getRawValue()).subscribe((token) => {
      sessionStorage.setItem(TOKEN_NAME, token);
    });
  }
}
