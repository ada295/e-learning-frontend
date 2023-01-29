import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Course} from "../api-models";

@Component({
  selector: 'app-finished-courses',
  templateUrl: './finished-courses.component.html',
  styleUrls: ['./finished-courses.component.css']
})
export class FinishedCoursesComponent implements OnChanges{
  @Input()
  allCourses: Course[] = [];
  finishedCourses: Course[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (let i = 0; i < this.allCourses.length; i++) {
      if (this.allCourses[i].finished) {
        this.finishedCourses.push(this.allCourses[i]);
      }
    }
  }
}
