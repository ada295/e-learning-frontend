import {Component} from '@angular/core';
import {AddExam, AddExamQuestion, AddQuestionAnswers} from "../../api-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  questionGroups: FormGroup[] = [];
  answersGroups = new Map();

  constructor(private formBuilder: FormBuilder) {
  }

  addExam() {
    if (this.examGroup.valid && this.examGroup.value.name && this.examGroup.value.amountOfQuestions) {
      this.exam.name = this.examGroup.value.name;
      for (let i = 0; i < parseInt(this.examGroup.value.amountOfQuestions); i++) {
        this.exam.questions.push(new AddExamQuestion());
        this.questionGroups.push(this.formBuilder.group(
          {
            content: ['', Validators.required],
            amountOfAnswers: ['', Validators.required],
            type: ['', Validators.required]
          }
        ))
      }
    }
  }

  addQuestion(i: number) {

    if (this.questionGroups[i].valid && this.questionGroups[i].value.content &&
      this.questionGroups[i].value.type && this.questionGroups[i].value.amountOfAnswers) {

      this.exam.questions[i].content = this.questionGroups[i].value.content;
      this.exam.questions[i].type = this.questionGroups[i].value.type;


      let questionAnswersGroups: FormGroup[] = [];

      for (let j = 0; j < parseInt(this.questionGroups[i].value.amountOfAnswers); j++) {
        this.exam.questions[i].answers.push(new AddQuestionAnswers());
        questionAnswersGroups.push(
          this.formBuilder.group(
            {
              content: ['', Validators.required],
              correct: ['', Validators.required],
            }
          )
        );
      }


      this.answersGroups.set(i, questionAnswersGroups);
    }
  }

  addAnswers(questionNumber: number) {
    let answersForQuestion = this.answersGroups.get(questionNumber);
    console.log(answersForQuestion);
    if (answersForQuestion.valid) {

    }
  }
}
