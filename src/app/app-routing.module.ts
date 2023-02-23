import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ExamComponent} from "./exam/exam.component";
import {AddCourseComponent} from "./add-course/add-course/add-course.component";

const routes: Routes = [
  {
    path: 'dodaj-kurs',
    component: AddCourseComponent
  },
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
  },
  {
    path: 'test/:id',
    component: ExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
