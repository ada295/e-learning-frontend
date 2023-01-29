import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../api-models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {

  allCourses: Course[] = [];

  constructor(private httpClient:HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>("http://localhost:8080/courses")
      .subscribe(courses => {
        this.allCourses = courses;
      });

  }
}
