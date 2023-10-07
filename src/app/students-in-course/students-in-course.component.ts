import {Component, OnInit} from '@angular/core';
import {CourseDetails, StudentUserInCourseTable} from "../api-models";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-students-in-course',
  templateUrl: './students-in-course.component.html',
  styleUrls: ['./students-in-course.component.css']
})
export class StudentsInCourseComponent implements OnInit {
  users: StudentUserInCourseTable[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  courseDetails: CourseDetails | undefined;

  // lessons: Lesson[] = [];


  ngOnInit() {
    if (this.sessionService.isTeacher() && !this.displayedColumns.includes("removeFromCourse")) {
      this.displayedColumns.push("removeFromCourse");
    }

    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<CourseDetails>("http://localhost:8080/courses/" + id)
      .pipe(
        catchError(error => {
          alert("Brak dostępu!");
          this.router.navigateByUrl("/kursy");
          return of(error);
        })
      )
      .subscribe(course => {
        this.courseDetails = course;
        this.users = course.students;
      })
  }

  removeFromCourse(id: any) {
    if (confirm("Czy na pewno chcesz usunąć tego użytkownika z kursu?")) {
      let courseId = this.route.snapshot.paramMap.get('id');
      this.httpClient.delete<CourseDetails>("http://localhost:8080/courses/" + courseId + "/remove-student/" + id)
        .pipe(
          catchError(error => {
            return of(error);
          })
        )
        .subscribe(() => this.ngOnInit());
    }
  }
}
