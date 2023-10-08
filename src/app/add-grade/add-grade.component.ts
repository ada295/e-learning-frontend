import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Course, User} from "../api-models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {

  @Input()
  type = "";
  @Input()
  course: Course | undefined;
  @Input()
  studentId: number | undefined;
  @Input()
  lessonId: number | undefined;

  student = new User();

  gradeGroup = this.formBuilder.group({
    type: ['', Validators.required],
    grade: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let studentId = this.route.snapshot.paramMap.get('studentId');
    if (this.studentId) {
      studentId = this.studentId + '';
    } else {
      this.studentId = parseInt(studentId + '');
    }

    this.httpClient.get<User>("http://localhost:8080/students/" + this.studentId)
      .subscribe(e => this.student = e)

  }

  addGrade() {
    if (this.type) {
      this.gradeGroup.patchValue({
        type: this.type
      });
    }

    if (this.gradeGroup.valid) {

      let studentId = this.route.snapshot.paramMap.get('studentId');
      if (this.studentId) {
        studentId = this.studentId + '';
      }
      let grade = {
        "category": this.gradeGroup.value.type,
        "comment": this.gradeGroup.value.description,
        "value": this.gradeGroup.value.grade,
        "lesson": {
          id: this.lessonId
        }
      }
      let courseId = this.route.snapshot.paramMap.get('courseId');
      if (this.course) {
        courseId = this.course.id + '';
      }
      this.httpClient.post(`http://localhost:8080/courses/${courseId}/add-grade/${studentId}`, grade)
        .subscribe(e => {
          let courseName = this.route.snapshot.paramMap.get('courseName');
          if (this.course) {
            courseName = this.course.name + '';
          }

          this.router.navigateByUrl("/dziennik/" + courseName + "/" + courseId);
        })
    } else {
      alert("Popraw błędy w formularzu!");
    }
  }

  updateValue(grade: HTMLInputElement) {
    if (parseInt(grade.value) > 5) {
      grade.value = "5";
    } else if (parseInt(grade.value) < 1) {
      grade.value = "1";
    }
  }
}
