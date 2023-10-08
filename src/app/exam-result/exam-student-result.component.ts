import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Course, User} from "../api-models";

export class QuestionStudentAnswerResponse {
  question = new Question();
  questionAnswers: Answer[] = [];
  studentAnswers: Answer[] = [];
  openQuestionAnswer = "";
  studentPoints = 0;
}

export class Answer {
  id = 0;
  content = "";
  correct = false;
}

export class Question {
  id: number = 0;
  content = "";
  points = 0;
  questionType = "";
}

class Exam {
  name = "";
  description = "";
  startDate = new Date();
  endDate = new Date();
}

export class ExamResult {
  examResultId = 0;
  questions: QuestionStudentAnswerResponse[] = [];
  exam: Exam = new Exam();
  points: number = 0;
  maxPoints: number = 0;
  student: User = new User();
  status: string = "";
  course: Course = new Course();
}


@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-student-result.component.html',
  styleUrls: ['./exam-student-result.component.css']
})
export class ExamStudentResultComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  exam = new ExamResult();

  ngOnInit() {
    let examResultId = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<ExamResult>("http://localhost:8080/exam-result/" + examResultId)
      .subscribe(result => {
          this.exam = result;
        }
      );
  }

  isCheckedAnswer(answer: Answer, studentAnswers: Answer[]) {
    return studentAnswers.map(value => value.id).includes(answer.id);
  }
}
