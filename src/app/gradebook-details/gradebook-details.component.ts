import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {CourseDetails, Grade, User} from "../api-models";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-gradebook-details',
  templateUrl: './gradebook-details.component.html',
  styleUrls: ['./gradebook-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GradebookDetailsComponent implements OnInit {
  courseName: string | null | undefined;
  courseId: string | null | undefined;
  gradeResponses: GradeResponse[] = [];
  dataSourceSummary: SummaryDataSource[] = [];
  columnsToDisplay1 = ['name', 'grade'];
  columnsToDisplay2 = ['name', 'grade'];
  columnsToDisplayWithExpand1: string [] = [];
  columnsToDisplayWithExpand2: string[] = [];
  expandedElement: SummaryDataSource | null | undefined;
  expandedElementChild: GradeDataSource | null | undefined;
  editRowMap = new Map<number, boolean>();

  constructor(private httpClient: HttpClient, private router: Router, public sessionService: SessionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editRowMap = new Map();
    if (this.sessionService.isTeacher() && !this.columnsToDisplay1.includes("add")) {
      this.columnsToDisplay1.push("add");
    }

    if (this.sessionService.isTeacher() && !this.columnsToDisplay2.includes("edit")) {
      this.columnsToDisplay2.push("edit");
      this.columnsToDisplay2.push("delete");
    }

    this.columnsToDisplayWithExpand1 = [...this.columnsToDisplay1, 'expand'];
    this.columnsToDisplayWithExpand2 = [...this.columnsToDisplay2, 'expand'];

    this.courseName = this.route.snapshot.paramMap.get('courseName');
    let id = this.route.snapshot.paramMap.get('id');
    this.courseId = id;
    this.httpClient.get<GradeResponse[]>("http://localhost:8080/courses/" + id + "/grades")
      .subscribe((gradeResponses) => {
        this.gradeResponses = gradeResponses;
        for (let gradeResponse of gradeResponses) {
          let summaryDataSource = new SummaryDataSource();
          summaryDataSource.avg = gradeResponse.avg;
          summaryDataSource.studentName = gradeResponse.student?.firstName;
          summaryDataSource.studentSurname = gradeResponse.student?.lastName;
          summaryDataSource.studentId = gradeResponse.student?.id;

          summaryDataSource.grades = [];
          for (let grade of gradeResponse.grades) {
            let dataSourceGrade = new GradeDataSource();
            dataSourceGrade.grade = grade.value;
            dataSourceGrade.value = grade.value + '';
            dataSourceGrade.gradeId = grade.id;
            dataSourceGrade.name = grade.category;
            dataSourceGrade.description = grade.comment;
            summaryDataSource.grades.push(dataSourceGrade);
          }

          this.dataSourceSummary.push(summaryDataSource);
        }
      });
  }

  edit(element: any) {
    this.editRowMap.set(element.gradeId, true);
  }

  noEdit(element: any) {
    this.editRowMap.set(element.gradeId, false);
    this.ngOnInit();
  }

  isEditGrade(element: any) {
    return this.editRowMap.get(element.gradeId);
  }

  getDataSourceForGrades(element: SummaryDataSource) {
    return element.grades;
  }

  updateValue(element: GradeDataSource, grade: HTMLInputElement) {
    if (parseInt(grade.value) > 5) {
      grade.value = "5";
    } else if (parseInt(grade.value) < 1) {
      grade.value = "1";
    }

    if(parseInt(grade.value) >= 1 && parseInt(grade.value) <=5) {
      console.log(grade.value);
      element.grade = parseInt(grade.value);
      element.value = grade.value;
    }
  }

  updateComment(element: GradeDataSource, comment: HTMLTextAreaElement) {
    element.description = comment.value;
  }

  delete(element:GradeDataSource) {
    this.httpClient.delete(`http://localhost:8080/courses/grades/delete-grade/` + element.gradeId)
      .subscribe(e => {
        this.dataSourceSummary = [];
        this.ngOnInit();
      })
  }

  editGrade(element: GradeDataSource) {
    if(element.value && element.value.length > 0 && element.description && element.description.length > 0) {
      let grade = {
        "category": element.name,
        "comment": element.description,
        "value": element.value,
        "id": element.gradeId
      }
      this.httpClient.post(`http://localhost:8080/courses/grades/edit-grade`, grade)
        .subscribe(e => {
          this.dataSourceSummary = [];
          this.ngOnInit();
        })
    } else {
      alert("Popraw błędy w formularzu!");
    }

  }
}

export class GradeResponse {
  course: CourseDetails | undefined;
  student: User | undefined;
  grades: Grade[] = [];
  avg: number | undefined;
}

export class SummaryDataSource {
  studentId: number | undefined;
  avg: number | undefined;
  studentName: string | undefined;
  studentSurname: string | undefined;
  add = "Dodaj ocenę";
  grades: GradeDataSource[] = [];
}

export class GradeDataSource {
  gradeId: number | undefined;
  grade: number | undefined;
  value: string | undefined;
  name: string | undefined;
  description: string | undefined;
  edit = "Edytuj";
  delete = "Usuń";
}


