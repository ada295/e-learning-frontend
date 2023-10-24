import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CourseDetails} from "../api-models";
import {SessionService} from "../session.service";
import {catchError, of} from "rxjs";


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})


export class CourseDetailsComponent implements OnInit {

  panelOpenState = false;
  lessonsSize = 0;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  courseDetails: CourseDetails | undefined;

  // lessons: Lesson[] = [];



  ngOnInit() {
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
        this.lessonsSize = course.lessons.length;
      })
  }

  toggleClass(event: any, classA: string, classB: string) {
    //event - informacje co dokladnie zostalo klikniete

    if (event.target.classList.contains(classA)) {
      event.target.classList.add(classB);
      event.target.classList.remove(classA);
    } else {
      event.target.classList.add(classA);
      event.target.classList.remove(classB);
    }

  }

  regenerateAccessCode() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpClient.post("http://localhost:8080/courses/" + id + "/regenerate-access-code", null)
      .subscribe(() => {
        this.ngOnInit();
      })
  }

  enableCourse() {
    let id = this.courseDetails?.course?.id;
    this.httpClient.put("http://localhost:8080/courses/" + id + "/enable", null)
      .subscribe(() => {
        this.ngOnInit();
      })
  }

  disableCourse() {
    let id = this.courseDetails?.course?.id;
    this.httpClient.put("http://localhost:8080/courses/" + id + "/disable", null)
      .subscribe(() => {
        this.ngOnInit();
      })
  }
}
