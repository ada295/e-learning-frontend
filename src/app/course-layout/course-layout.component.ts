import {Component, Input} from '@angular/core';
import {Course} from "../api-models";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent {
  @Input()
  courses: Course[] = [];

  constructor(public sessionService: SessionService) {
  }

}
