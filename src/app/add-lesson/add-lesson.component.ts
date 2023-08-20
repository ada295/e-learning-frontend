import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AddExam, Lesson} from "../api-models";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {

  lessonGroup = this.formBuilder.group({
    name: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  addLesson() {
    if (this.lessonGroup.valid) {
      let lessonRequest = new Lesson();
      if (this.lessonGroup.value.name)
        lessonRequest.name = this.lessonGroup.value.name;

    // pobierz id z linku
    this.httpClient.post<Lesson>("http://localhost:8080/course/1/exam", lessonRequest)
      .pipe(
        catchError(error => {
          alert(error.error);
          return of([]);
        })
      )
      .subscribe(value =>
        //kolko przestaje sie krecic
        alert("Lekcja została dodana!")
      );
  }
  }
}
