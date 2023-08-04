import {Component, HostListener} from '@angular/core';
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
  desired_columns = 3;
  desired_row_height = '2:1';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setAmountOfColumns(event.target.innerWidth);
  }

  ngOnInit() {
    this.setAmountOfColumns(window.innerWidth);
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<Task []>("http://localhost:8080/lessons/" + id + "/tasks").subscribe(tasks => this.tasks = tasks)
  }

  getHeaderAmountOfColumnsInGrid() {
    if (this.desired_columns < 3) {
      return 1;
    } else {
      return 3;
    }
  }

  getHeaderRowHeightInGrid() {
    if (this.desired_columns == 2) {
      return '8:1';
    } else if (this.desired_columns == 1) {
      return '5:1';
    } else {
      return '5:1';
    }
  }

  private setAmountOfColumns(width: any) {
    this.desired_columns = Math.trunc(width / 400);
  }
}
