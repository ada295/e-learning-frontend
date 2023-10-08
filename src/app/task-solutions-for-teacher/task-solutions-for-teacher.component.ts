import {Component, OnInit} from '@angular/core';
import {StudentSolutionForTask} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-task-solutions-for-teacher',
  templateUrl: './task-solutions-for-teacher.component.html',
  styleUrls: ['./task-solutions-for-teacher.component.css']
})
export class TaskSolutionsForTeacherComponent implements OnInit {

  solutions: StudentSolutionForTask[] = [];

  addGradeFlag = false;
  addGradeStudentId: number | undefined = -1;
  addGradeLessonId: number | undefined = -1;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.loadTaskDetails();
  }

  private loadTaskDetails() {
    let lessonId = this.route.snapshot.paramMap.get('lessonId');
    let taskId = this.route.snapshot.paramMap.get('taskId');
    this.httpClient.get<StudentSolutionForTask[]>("http://localhost:8080/tasks/" + taskId + "/student-tasks-solutions")
      .subscribe(res => this.solutions = res)
  }

  addGrade(studentId: any, lessonId: any) {
    this.addGradeFlag = true;
    this.addGradeStudentId = studentId;
    this.addGradeLessonId = lessonId;
  }

  cancelAddGrade() {
    this.addGradeFlag = false;
    this.addGradeStudentId = -1;
    this.addGradeLessonId = -1;
  }

}
