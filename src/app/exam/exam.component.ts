import {Component, OnInit} from '@angular/core';
import {ExamDetailsResponse} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  exam: ExamDetailsResponse | undefined;

  exampleABCDOdpowiedziTest = ["2", "3", "4", "10"]


  examAnswers: FormGroup[] = []

  exampleABCD = this.formBuilder.group({
    questionId: 1,
    answersIds: this.formBuilder.array([1, 2, 3, 4]),
    answers: this.formBuilder.array([false, true, true, false]),
  });

  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //pobranie wartości a adresu URL /test/:id
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/exam/" + id).subscribe(exam => {
        this.exam = exam;

        if (this.exam && this.exam.questions) {
          for (let i = 0; i < this.exam.questions.length; i++) {
            let answersIds = this.exam.questions[i].answers.map(ans => ans.id);

            if (this.exam.questions[i].questionType == "MULTI_CHOICE") {
              let formGroup = this.formBuilder.group({
                questionId: this.exam.questions[i].id,
                answersIds: this.formBuilder.array(answersIds),
                answers: this.formBuilder.array(this.exam.questions[i].answers.map(() => false)), //zwraca false dla kazdego pytania
              });
              this.examAnswers.push(formGroup);
            } else if (this.exam.questions[i].questionType == "ONE_CHOICE") {
              let formGroup = this.formBuilder.group({
                questionId: this.exam.questions[i].id,
                answersIds: this.formBuilder.array(answersIds),
                answers: "", //przechowuje zaznaczona odpowiedz (value)
              });
              this.examAnswers.push(formGroup);
            }
          }
        }
      }
    );


  }

  showConfirmation() {
    let decision = confirm('Czy na pewno chcesz zakończyć test?');
    if (decision) {
      // wysłanie odpowiedzi do BE
    }
  }


  //
  // exampleABCDOneChoice = this.formBuilder.group({
  //   answerA: false,
  //   answerB: false,
  //   answerC: false,
  //   answerD: false
  // });

}
