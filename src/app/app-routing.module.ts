import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {LessonsComponent} from "./lessons/lessons.component";

const routes: Routes = [
  {
    path: 'kursy',
    component: CoursesComponent
  },
  {
    path: 'kursy/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'lekcja/:id',
    component: LessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
