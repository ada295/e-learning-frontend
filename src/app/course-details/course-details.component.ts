import {Component, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Course, Lesson} from "../api-models";


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute, private httpClient:HttpClient) {
  }

  courseDetails: Course | undefined;
  lessons: Lesson[] = [];


  ngOnInit() {
    //pobranie wartości z adrmMap.geesu URL /kursy/:id
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<Course>("http://localhost:8080/courses/"+id).subscribe(course => this.courseDetails = course)

    this.httpClient.get<Lesson[]>("http://localhost:8080/lessons?courseId="+id).subscribe(lessons => this.lessons = lessons)
  }
}
