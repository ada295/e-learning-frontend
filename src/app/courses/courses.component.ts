import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../api-models";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {

  allCourses: Course[] = [];

  constructor(private httpClient:HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>("http://localhost:8080/courses")
      .subscribe(courses => {
        for (let i = 0; i < courses.length; i++) {
          courses[i].customLink = '/kursy/' + courses[i].id;
        }
        this.allCourses = courses;
      });

  }
}
