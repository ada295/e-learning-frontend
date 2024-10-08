import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {User} from "../api-models";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    surname: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    userRole: ['', Validators.required],
  });
  isLinear: any;

  constructor(private router: Router, private _formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  addUser() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {

      let user = new User();
      user.firstName = this.firstFormGroup.value.name ? this.firstFormGroup.value.name : "";
      user.lastName = this.secondFormGroup.value.surname ? this.secondFormGroup.value.surname : "";
      user.email = this.thirdFormGroup.value.email ? this.thirdFormGroup.value.email : "";
      user.roles = [this.fourthFormGroup.value.userRole ? this.fourthFormGroup.value.userRole : ""];

      console.log(user);


      this.httpClient.post<any>("http://localhost:8080/auth/register", user)
        .pipe(
          catchError(error => {
            if (error.error == "Email unique!") {
              alert("Konto o podanym emailu już istnieje!");
            }
            return of([]);
          })
        )
        .subscribe(value => {
            if (value && value.password) {
              alert("Konto dodane: " + value.password);
              this.router.navigateByUrl("/uzytkownicy");
            }
          }
        );
    } else {
      alert("Niepoprawne dane");
    }
  }


}

