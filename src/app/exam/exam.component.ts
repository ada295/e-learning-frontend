import {Component, OnInit} from '@angular/core';
import {ExamDetailsResponse} from "../api-models";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  exam: ExamDetailsResponse | undefined;

  examAnswers: FormGroup[] = []

  lessonId: string | null = "";

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,
              private formBuilder: FormBuilder,  public sessionService: SessionService) {
  }

  ngOnInit() {
    let lessonId = this.route.snapshot.paramMap.get('id');
    this.lessonId = lessonId;

    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/exam/" + lessonId + "/active-exam").subscribe(exam => {
        this.exam = exam;

        if (this.exam && this.exam.questions) {
          for (let i = 0; i < this.exam.questions.length; i++) {
            let answersIds = this.exam.questions[i].answers.map(ans => ans.id);
            let questionType = this.exam.questions[i].questionType;
            if (questionType == "MULTI_CHOICE") {
              let formGroup = this.formBuilder.group({
                questionId: this.exam.questions[i].id,
                answersIds: this.formBuilder.array(answersIds),
                answers: this.formBuilder.array(this.exam.questions[i].answers.map(() => false)), //zwraca false dla kazdego pytania
              });
              this.examAnswers.push(formGroup);
            } else if (questionType == "ONE_CHOICE" || questionType == "OPEN") {
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
    let id = this.route.snapshot.paramMap.get('id');

    let decision = confirm('Czy na pewno chcesz zakończyć test?');
    if (decision) {
      //zmienic na inne wysylanie id, bo mozna tym za bardzo manipulowac
      let id = this.route.snapshot.paramMap.get('id');
      // wysłanie odpowiedzi do BE
      let body = this.examAnswers.map(e => e.value);
      this.httpClient.post<any>("http://localhost:8080/exam/" + id + "/finish", body)
        .subscribe(value => {
          this.router.navigateByUrl("/lekcja/" + id + "/wynik-testu");
        });
    }
  }

  protected readonly sessionStorage = sessionStorage;
}
