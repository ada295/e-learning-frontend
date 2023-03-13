import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Course, Teacher} from "../../api-models";


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
  isLinear: any;

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) {
  }



  addTeacher() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {

      let teacher = new Teacher();
      teacher.name = this.firstFormGroup.value.name ? this.firstFormGroup.value.name : "";
      teacher.surname = this.secondFormGroup.value.surname ? this.secondFormGroup.value.surname : "";
      teacher.email = this.thirdFormGroup.value.email ? this.thirdFormGroup.value.email : "";


      this.httpClient.post<Teacher>("http://localhost:8080/teachers", teacher)
        .subscribe(
          //kolko przestaje sie krecic
        )
    }
  }


}

