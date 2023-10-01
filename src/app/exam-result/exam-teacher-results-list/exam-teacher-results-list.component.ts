import {Component, OnInit} from '@angular/core';
import {Answer, ExamResult} from "../exam-student-result.component";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-exam-teacher-results-list',
  templateUrl: './exam-teacher-results-list.component.html',
  styleUrls: ['./exam-teacher-results-list.component.css']
})
export class ExamTeacherResultsListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  exams: ExamResult[] = [];

  ngOnInit() {
    let lessonId = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<ExamResult[]>("http://localhost:8080/teacher-exam-results/" + lessonId)
      .subscribe(result => {
          this.exams = result;
        }
      );
  }
}
