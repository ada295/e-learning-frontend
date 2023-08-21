import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {Task, TaskToDo} from "../api-models";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{

  panelOpenState = false;
  task: TaskToDo | undefined;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<TaskToDo>("http://localhost:8080/student-tasks/" + id).subscribe(task => this.task = task)

  }


}
