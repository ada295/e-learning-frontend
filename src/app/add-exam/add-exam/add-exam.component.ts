import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatOption} from "@angular/material/core";

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

  allQuestionsValid() {
    for (let i = 0; i < this.questionGroups.length; i++) {
      if (!this.questionGroups[i].valid) {
        return false;
      }
    }
    return true;
  }

  allAnswersValid() {
    for (let [_, value] of this.answersGroups) {
      for (let i = 0; i < value.length; i++) {
        if (!value[i].valid) {
          console.log(i);
          return false;
        }
      }
    }
    return true;
  }

  saveExam() {

    if (this.isValid()) {
      console.log(this.examGroup.value);
      this.questionGroups.forEach(a => console.log(a));
      this.answersGroups.forEach(a => console.log(a));
    }
  }

  isValid() {
    let atLeastOneAnswer = false;
    for (let [_, value] of this.answersGroups) {
      for (let i = 0; i < value.length; i++) {
        atLeastOneAnswer = true;
        break;
      }
    }

    return this.examGroup.valid && this.allQuestionsValid() && this.allAnswersValid()
      && this.questionGroups.length > 0 && atLeastOneAnswer;
  }

  saveOneChoiceQuestion(questionNumber: number, selected: MatOption<any> | MatOption[]) {
    let correctAnswer = -1;
    if (selected instanceof MatOption) {
      correctAnswer = selected.value;
    } else {
      correctAnswer = selected[0].value;
    }
    let answers = this.answersGroups.get(questionNumber);
    for (let a = 0; a < answers.length; a++) {
      answers[a].patchValue({
        correct: false
      });
    }
    this.answersGroups.get(questionNumber)[correctAnswer].patchValue({
      correct: true
    });
    this.answersGroups.get(questionNumber)[correctAnswer].markAsTouched();
  }
}
