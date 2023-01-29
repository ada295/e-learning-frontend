import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

class Course {
  id: number = 0;
  name: string = "";
  description: string = "";
}

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  allCourses: Course[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>("http://localhost:8080/courses")
      .subscribe(courses => {
        this.allCourses = courses;
      });
  }
}

