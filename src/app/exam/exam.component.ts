import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ExamDetailsResponse} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit{


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  exam: ExamDetailsResponse | undefined;

  ngOnInit() {
    //pobranie wartości a adresu URL /test/:id
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/exam/" + id).subscribe(exam => this.exam = exam);
  }


  // constructor(private formBuilder: FormBuilder) {
  // }
  // exampleABCD = this.formBuilder.group({
  //   answerA: false,
  //   answerB: false,
  //   answerC: false,
  //   answerD: false
  // });
  //
  // exampleABCDOneChoice = this.formBuilder.group({
  //   answerA: false,
  //   answerB: false,
  //   answerC: false,
  //   answerD: false
  // });
}
