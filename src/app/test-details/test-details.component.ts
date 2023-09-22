import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Announcement, ExamDetailsResponse, Lesson} from "../api-models";
import {catchError, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit{

  response: ExamDetailsResponse | undefined;
  lessonId: string | null = '0';
  description: string | undefined;


  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
   this.lessonId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/lesson/" + this.lessonId + "/exam-details")
      .subscribe(exam => {
      this.response = exam;
        if (this.response && this.response.exam){
          this.description = this.response.exam.name;
        }
      });


  }
}
