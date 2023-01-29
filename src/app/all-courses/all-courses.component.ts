import {Component, Input} from '@angular/core';
import {Course} from "../api-models";

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  @Input()
  allCourses: Course[] = [];
}

