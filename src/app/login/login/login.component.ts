import { Component } from '@angular/core';
import {SessionService} from "../../session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private sessionService: SessionService) {
  }


  login() {
    //dodac formGroup i przeslac prawdziwy login i haslo
    this.sessionService.login("","");
  }

}
