import { Component } from '@angular/core';
import {AddExam, AddExamQuestion} from "../../api-models";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent {

  exam = new AddExam();
  examGroup = this.formBuilder.group({
    name: ['', Validators.required],
    amountOfQuestions: ['', Validators.required],
  })


  constructor(private formBuilder: FormBuilder) {
  }

  addExam() {
    if (this.examGroup.valid && this.examGroup.value.name && this.examGroup.value.amountOfQuestions) {
      this.exam.name = this.examGroup.value.name;
      for (let i = 0; i < parseInt(this.examGroup.value.amountOfQuestions); i++) {
        this.exam.questions.push(new AddExamQuestion());
      }
    }
  }
}
