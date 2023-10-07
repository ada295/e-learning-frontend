import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CourseDetails} from "../api-models";
import {SessionService} from "../session.service";


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})


export class CourseDetailsComponent implements OnInit {

  panelOpenState = false;
  lessonsSize = 0;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  courseDetails: CourseDetails | undefined;

  // lessons: Lesson[] = [];



  ngOnInit() {
    //pobranie wartości z adrmMap.geesu URL /kursy/:id
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<CourseDetails>("http://localhost:8080/courses/" + id)
      .subscribe(course => {
        this.courseDetails = course;
        this.lessonsSize = course.lessons.length;
      })
    // this.httpClient.get<Course>("http://localhost:8080/courses/"+id).subscribe(course => this.courseDetails = course)
    //
    // this.httpClient.get<Lesson[]>("http://localhost:8080/lessons?courseId="+id).subscribe(lessons => this.lessons = lessons)


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
}
