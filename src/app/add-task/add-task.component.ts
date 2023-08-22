import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Lesson, Task} from "../api-models";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskGroup = this.formBuilder.group({
    endDate: [Date, Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  addTask() {
    if (this.taskGroup.valid) {
      let taskRequest = new Task();
      if (this.taskGroup.value.description && this.taskGroup.value.endDate) {
      taskRequest.name = this.taskGroup.value.description;
      // taskRequest.endDate = this.taskGroup.value.endDate;
    }
        // pobierz id z linku
        // this.httpClient.post<Lesson>("http://localhost:8080/course/1/exam", taskRequest)
        // .pipe(
        //   catchError(error => {
        //     alert(error.error);
        //     return of([]);
        //   })
        // )
        // .subscribe(value =>
        //   //kolko przestaje sie krecic
        //   alert("Lekcja została dodana!")
        // );
    }
  }
}
