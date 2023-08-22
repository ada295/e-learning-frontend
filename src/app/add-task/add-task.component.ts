import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Lesson, Task} from "../api-models";
import {catchError, of} from "rxjs";
import {DateRange} from "@angular/material/datepicker";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  selected: Date | DateRange<Date> | null = new Date();

  taskGroup = this.formBuilder.group({
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute) {
  }


  addTask() {
    if (this.taskGroup.valid) {
      let taskRequest = new Task();
      if (this.taskGroup.value.description) {
      taskRequest.description = this.taskGroup.value.description;
      if (this.selected != null && this.selected instanceof Date)
        taskRequest.endDate = this.selected;
    }

      let lessonId = this.route.snapshot.paramMap.get('id')

      this.httpClient.post<Task>(`http://localhost:8080/lessons/${lessonId}/tasks`, taskRequest)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value =>
          //kolko przestaje sie krecic
          alert("Zadanie dodane!")
        );
    }
  }

  selectedDateAsString() {
    if (this.selected != null && this.selected instanceof Date) {
      if (this.selected.getDate() < 10 && this.selected.getMonth() + 1 < 10) {
        return "0" + this.selected.getDate() + "-" + "0" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getDate() < 10) {
        return "0" + this.selected.getDate() + "-" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getMonth() + 1 < 10) {
        return this.selected.getDate() + "-" + "0" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else return this.selected.getDate() + "-" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
    }
    return "";
  }
}
