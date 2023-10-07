import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {Course} from "../api-models";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.css']
})
export class JoinCourseComponent {

  constructor(private router: Router, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  joinCourse(code: string) {
    this.httpClient.post<Course>("http://localhost:8080/courses/" + code + "/join", null)
      .pipe(
        catchError(error => {
          alert("Błędny kod!");
          return of(error);
        })
      ).subscribe((res) => {
      this.router.navigateByUrl("/kursy/" + res.id)
    })
  }
}
