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
    //this.actualCourses.push(this.allCourses[i]);
    //co jezeli ngOnChanges wykona sie 2x -> 2x wiecej elementów w actualCoursers
    //this.actualCourses = []; trzeba wyzerowac przed dodaniem
    for (let i = 0; i < this.allCourses.length; i++) {
      if (!this.allCourses[i].finished) {
        this.actualCourses.push(this.allCourses[i]);
      }
    }
  }
}
