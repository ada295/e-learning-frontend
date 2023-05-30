import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {AddExam, AddExamQuestion, AddQuestionAnswer} from "../../api-models";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";

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
    description: ['', Validators.required],
  })

  questionGroups: FormGroup[] = [];
  answersGroups = new Map();

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
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
          return false;
        }
      }
    }
    return true;
  }

  saveExam() {
    if (this.isValid()) {
      let examRequest = new AddExam();

      examRequest.name = this.examGroup.value.name;
      examRequest.description = this.examGroup.value.description;

      let questionNumber = 0;
      for (let questionGroup of this.questionGroups) {
        let addQuestion = new AddExamQuestion();
        addQuestion.content = questionGroup.value.content;
        addQuestion.type = questionGroup.value.type;
        addQuestion.points = questionGroup.value.points;

        for (let answerGroup of this.answersGroups.get(questionNumber)) {
          let addExamAnswer = new AddQuestionAnswer();
          addExamAnswer.content = answerGroup.value.content;
          addExamAnswer.correct = answerGroup.value.correct;

          addQuestion.answers.push(addExamAnswer);
        }

        examRequest.questions.push(addQuestion);
        questionNumber++;
      }

      // pobierz id z linku
      this.httpClient.post<AddExam>("http://localhost:8080/course/1/exam", examRequest)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value =>
          //kolko przestaje sie krecic
          alert("Test został dodany!")
        );
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

  saveOneChoiceQuestion(questionNumber
                          :
                          number, selected
                          :
                          MatOption<any> | MatOption[]
  ) {
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
