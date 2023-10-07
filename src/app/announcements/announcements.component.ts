import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {CourseDetails, Lesson} from "../api-models";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  course: CourseDetails | undefined;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }


  ngOnInit() {
    let courseId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<CourseDetails>("http://localhost:8080/courses/" + courseId).subscribe(course => {
      this.course = course;
    });
  }

  delete(announcementId: string) {
    if (confirm("Czy na pewno chcesz usunąć ogłoszenie?")) {
      let courseId = this.route.snapshot.paramMap.get('id');
      this.httpClient.delete<Lesson>("http://localhost:8080/courses/" + courseId + "/announcements/" + announcementId)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(value => {
          this.ngOnInit();
        });
    }
  }
}
