import { Component } from '@angular/core';
import {SessionService} from "../session.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Task} from "../api-models";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task [] | undefined;

  constructor(public sessionService: SessionService) {
  }


}
