import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent {

  examBasicInformationSet = false;

  examGroup = this.formBuilder.group({
    name: ['', Validators.required],
    amountOfQuestions: ['', Validators.required],
  })

  questionGroups: FormGroup[] = [];
  answersGroups = new Map();

  constructor(private formBuilder: FormBuilder) {
  }

  addExam() {
    if (this.examGroup.valid) {
      this.examBasicInformationSet = true;
      for (let i = 0; i < parseInt(<string>this.examGroup.value.amountOfQuestions); i++) {
        this.questionGroups.push(
          this.formBuilder.group(
            {
              content: ['', Validators.required],
              amountOfAnswers: ['', Validators.required],
              type: ['', Validators.required]
            }
          )
        )
      }
    }
  }

  addQuestion(i: number) {
    if (this.questionGroups[i].valid) {
      let questionAnswersGroups: FormGroup[] = [];

      // dodac Zmiana ilosci pytan i edycje

      for (let j = 0; j < parseInt(this.questionGroups[i].value.amountOfAnswers); j++) {
        questionAnswersGroups.push(
          this.formBuilder.group(
            {
              content: ['', Validators.required],
              correct: ['', Validators.required]
            }
          )
        );
      }

      this.answersGroups.set(i, questionAnswersGroups);
    }
  }

  saveExam() {
    function allAnswersValid() {
      //change me
      return true;
    }

    function allQuestionsValid() {
      //change me
      return true;
    }

    if (this.examGroup.valid && allQuestionsValid() && allAnswersValid()) {
      console.log(this.examGroup.value);
      this.questionGroups.forEach(a => console.log(a));
      this.answersGroups.forEach(a => console.log(a));
    }
  }
}
