import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {Course, CourseDetails, Lesson, Task, TaskToDo} from "../api-models";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit{

  course: CourseDetails | undefined;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }


  ngOnInit() {
    let courseId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<CourseDetails>("http://localhost:8080/courses/" + courseId).subscribe(course => {this.course = course; console.log(this.course)});
  }

}
