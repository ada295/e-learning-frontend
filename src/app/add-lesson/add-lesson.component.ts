import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../api-models";
import {catchError, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {

  lessonGroup = this.formBuilder.group({
    name: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }


  addLesson() {
    if (this.lessonGroup.valid) {
      let lessonRequest = new Lesson();
      if (this.lessonGroup.value.name)
        lessonRequest.name = this.lessonGroup.value.name;

      let id = this.route.snapshot.paramMap.get('id');

      this.httpClient.post<Lesson>("http://localhost:8080/courses/" + id + "/lessons", lessonRequest)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(value => {
            alert("Lekcja została dodana!")
            this.router.navigateByUrl("kursy/" + id);
          }
        );
  }
  }
}
