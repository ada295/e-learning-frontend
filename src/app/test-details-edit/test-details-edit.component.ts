import {Component, OnInit} from '@angular/core';
import {ExamDetailsResponse, Lesson} from "../api-models";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../session.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AddExamComponent} from "../add-exam/add-exam/add-exam.component";
import {formatDate} from "@angular/common";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-test-details-edit',
  templateUrl: './test-details-edit.component.html',
  styleUrls: ['./test-details-edit.component.css']
})
export class TestDetailsEditComponent implements OnInit {

  response: ExamDetailsResponse | undefined;
  lessonId: string | null = '0';
  lesson: Lesson | undefined;

  examGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required, AddExamComponent.LessThanToday],
    endDate: ['', Validators.required, AddExamComponent.LessThanToday]
  })


  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              public sessionService: SessionService) {
  }

  ngOnInit() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/lesson/" + this.lessonId + "/exam-details")
      .subscribe(exam => {
        this.response = exam;
        if (this.response && this.response.exam) {
          // @ts-ignore
          let startDate = formatDate(this.response.exam.startDate, 'yyyy-MM-ddTHH:mm:SS', 'en');
          // @ts-ignore
          let endDate = formatDate(this.response.exam.endDate, 'yyyy-MM-ddTHH:mm:SS', 'en');
          this.examGroup.patchValue({
            name: this.response.exam.name,
            description: this.response.exam.description,
            startDate: startDate,
            endDate: endDate,
          })
        }
      });


    this.httpClient.get<Lesson>("http://localhost:8080/lessons/" + this.lessonId).subscribe(lesson => this.lesson = lesson);
  }

  editExam() {
    if (this.examGroup.valid) {
      this.httpClient.put("http://localhost:8080/lesson/" + this.lessonId + "/exam", this.examGroup.value)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value => {
            alert("Test został edytowany!");
            this.router.navigateByUrl("/lekcja/" + this.lessonId + "/test-opis");
          }
        );
    } else {
      alert("Popraw błędy w formularzu!");
    }

  }
}
