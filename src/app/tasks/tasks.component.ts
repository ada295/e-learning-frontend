import { Component } from '@angular/core';
import {SessionService} from "../session.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Material, Task} from "../api-models";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task [] | undefined;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<Task []>("http://localhost:8080/lessons/" + id + "/tasks").subscribe(tasks => this.tasks = tasks)
  }


}
