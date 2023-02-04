import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  constructor(private formBuilder: FormBuilder) {
  }
  exampleABCD = this.formBuilder.group({
    answerA: false,
    answerB: false,
    answerC: false,
    answerD: false
  });

  exampleABCDOneChoice = this.formBuilder.group({
    answerA: false,
    answerB: false,
    answerC: false,
    answerD: false
  });
}
