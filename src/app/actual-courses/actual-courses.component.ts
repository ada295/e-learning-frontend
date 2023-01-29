import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Course} from "../api-models";

@Component({
  selector: 'app-actual-courses',
  templateUrl: './actual-courses.component.html',
  styleUrls: ['./actual-courses.component.css']
})
export class ActualCoursesComponent implements OnChanges{
  @Input()
  allCourses: Course[] = [];
  actualCourses: Course[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (let i = 0; i < this.allCourses.length; i++) {
      if (!this.allCourses[i].finished) {
        this.actualCourses.push(this.allCourses[i]);
      }
    }
  }
}
