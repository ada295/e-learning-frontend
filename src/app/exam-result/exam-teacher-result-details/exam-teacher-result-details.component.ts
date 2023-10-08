import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Answer, ExamResult} from "../exam-student-result.component";
import {Course} from "../../api-models";

@Component({
  selector: 'app-exam-teacher-result-details',
  templateUrl: './exam-teacher-result-details.component.html',
  styleUrls: ['./exam-teacher-result-details.component.css']
})
export class ExamTeacherResultDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  exam = new ExamResult();
  course: Course = new Course();

  ngOnInit() {
    let examResultId = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<ExamResult>(`http://localhost:8080/teacher-exam-results/${examResultId}/details`)
      .subscribe(result => {
          this.exam = result;
          this.course = result.course;
        }
      );
  }

  isCheckedAnswer(answer: Answer, studentAnswers: Answer[]) {
    return studentAnswers.map(value => value.id).includes(answer.id);
  }

  updateGrade(id: number, value: string) {
    let examResultId = this.route.snapshot.paramMap.get('id');
    this.httpClient.post<any>(`http://localhost:8080/exam-result/${examResultId}/question/${id}`, {
      "points": value
    }).subscribe(result => {
        this.ngOnInit();
      }
    );
  }

  finishAndCloseExamResult() {
    let res = confirm("Czy na pewno chcesz zakończyć ocenianie tego egzaminu? " +
      "Pytania otwarte bez oceny zostaną ocenione na 0 punktów!");
    if(res) {
      let examResultId = this.route.snapshot.paramMap.get('id');
      this.httpClient.post<any>(`http://localhost:8080/exam-result/${examResultId}`, {})
        .subscribe(result => {
          this.ngOnInit();
        }
      );
    }
  }
}
