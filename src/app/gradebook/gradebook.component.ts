import {Component, OnInit} from '@angular/core';
import {Course} from "../api-models";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit{
  allCourses: Course[] = [];

  constructor(private httpClient:HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>("http://localhost:8080/courses")
      .subscribe(courses => {
        for (let i = 0; i < courses.length; i++) {
          courses[i].customLink = '/dziennik/' + courses[i].name + '/' + courses[i].id;
          courses[i].customLabel = "Średnia ocen: " + "5.0";
        }
        this.allCourses = courses;
      });

  }
}
