import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExamDetailsResponse, Lesson, Task, TaskToDo} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit{

  response: ExamDetailsResponse | undefined;
  lessonId: string | null = '0';
  description: string | undefined;
  lesson: Lesson | undefined;


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, public sessionService: SessionService) {
  }

  ngOnInit() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<ExamDetailsResponse>("http://localhost:8080/lesson/" + this.lessonId + "/exam-details")
      .subscribe(exam => {
        this.response = exam;
        if (this.response && this.response.exam) {
          this.description = this.response.exam.name;
        }
      });


    this.httpClient.get<Lesson>("http://localhost:8080/lessons/" + this.lessonId).subscribe(lesson => this.lesson = lesson);
  }

  isActiveTest() {
    return false;
  }

  tasks: Task [] | undefined;
  tasksStudent: TaskToDo[] | undefined;
  desired_columns = 3;
  desired_row_height = '2:1';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setAmountOfColumns(event.target.innerWidth);
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
