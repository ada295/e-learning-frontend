import { Component } from '@angular/core';
import {SessionService} from "../../session.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private sessionService: SessionService, private formBuilder: FormBuilder) {
  }

  loginForm = this.formBuilder.group({
    username: ["", [Validators.required, Validators.maxLength(50)]],
    password: ["", [Validators.required, Validators.maxLength(50)]]
  });

  isValidForm(){
    return this.loginForm.valid;
  }


  login() {
    //dodac formGroup i przeslac prawdziwy login i haslo
    this.sessionService.login(this.loginForm.value.username,this.loginForm.value.password);
  }

}
