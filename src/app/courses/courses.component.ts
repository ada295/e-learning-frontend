import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent {
  public title = "Kursy";
}
