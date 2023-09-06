import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {TaskToDo} from "../api-models";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  lessonId: string | null = '0';
  panelOpenState = false;
  task: TaskToDo | undefined;
  fileName = '';
  formData = new FormData();

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.formData.append("file", file);
    }
  }


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.lessonId = id;
    this.loadTaskDetails();
  }

  deleteTask() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpClient.delete<TaskToDo>("http://localhost:8080/student-tasks/" + id + "/delete").subscribe(task => this.task = task);
    this.ngOnInit();
  }

  checkDate(task: TaskToDo | undefined) {
    if (task && task.task && task.task.endDate) {
      console.log(this.convertDateToUTC(new Date(task.task.endDate)));
      console.log(this.convertDateToUTC(new Date()));
      return this.convertDateToUTC(new Date(task.task.endDate)).getTime() >= this.convertDateToUTC(new Date()).getTime();
    }
    return false;
  }

  convertDateToUTC(date: Date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  private loadTaskDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<TaskToDo>("http://localhost:8080/student-tasks/" + id).subscribe(task => this.task = task)
  }
}
