import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Course} from "../../api-models";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  nameFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });
  descriptionFormGroup = this._formBuilder.group({
    description: ['', Validators.max(500)],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) {

  }

  addCourse() {
    if (this.nameFormGroup.valid && this.descriptionFormGroup.valid) {
      let name = this.nameFormGroup.value.name;
      let description = this.descriptionFormGroup.value.description;
      let course = new Course();
      course.name = name ? name: "";
      course.description = description ? description: "";

      this.httpClient.post<Course>("http://localhost:8080/courses", course)
        .subscribe(value => {
          //uruchamia się, gdy request się wykona
          //dodać wyświetlenie komunikatu na frontendzie "Dodałeś kurs"
        });
    }


    // this.httpClient.post<any>("http://localhost:8080/exam/" + id + "/finish", body)
    //   .subscribe(value => {
    //   });
  }
}
