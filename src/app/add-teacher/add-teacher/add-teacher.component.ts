import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {User} from "../../api-models";
import {catchError, of} from "rxjs";


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {
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

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  addTeacher() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {

      let user = new User();
      user.firstName = this.firstFormGroup.value.name ? this.firstFormGroup.value.name : "";
      user.lastName = this.secondFormGroup.value.surname ? this.secondFormGroup.value.surname : "";
      user.email = this.thirdFormGroup.value.email ? this.thirdFormGroup.value.email : "";
      user.roles = [this.fourthFormGroup.value.userRole ? this.fourthFormGroup.value.userRole: ""];

      console.log(user);


      this.httpClient.post<any>("http://localhost:8080/auth/register", user)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value =>
          //kolko przestaje sie krecic
          alert("Konto dodane: " + value.password)
        );
    } else {
      alert("Niepoprawne dane");
    }
  }


}

