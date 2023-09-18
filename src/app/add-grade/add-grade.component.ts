import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent {

  gradeGroup = this.formBuilder.group({
    type: ['', Validators.required],
    grade: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  addGrade() {
    if (this.gradeGroup.valid) {

    }
  }

  updateValue(grade: HTMLInputElement) {
    if(parseInt(grade.value) > 6) {
      grade.value = "6";
    } else if (parseInt(grade.value) < 1) {
      grade.value = "1";
    }
  }
}
