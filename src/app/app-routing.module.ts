import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ExamComponent} from "./exam/exam.component";
import {AddCourseComponent} from "./add-course/add-course/add-course.component";
import {AddTeacherComponent} from "./add-teacher/add-teacher/add-teacher.component";
import {TeachersComponent} from "./teachers/teachers.component";
import {LoginComponent} from "./login/login/login.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {JoinCourseComponent} from "./join-course/join-course.component";
import {LoggedUserGuard} from "./logged-user.guard";
import {RoleAccessGuard} from "./role-access-guard.service";
import {AddExam} from "./api-models";
import {AddExamComponent} from "./add-exam/add-exam/add-exam.component";
import {MaterialComponent} from "./material/material.component";
import {TasksComponent} from "./tasks/tasks.component";
import {AnnouncementsComponent} from "./announcements/announcements.component";
import {AddEventComponent} from "./add-event/add-event.component";
import {AddMaterialComponent} from "./add-material/add-material.component";
import {TaskDetailsComponent} from "./task-details/task-details.component";

const routes: Routes = [
  {
    path: 'kalendarz',
    component: CalendarComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'nauczyciele',
    component: TeachersComponent,
    canActivate: [LoggedUserGuard,RoleAccessGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'dodaj-nauczyciela',
    component: AddTeacherComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'dodaj-kurs',
    component: AddCourseComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'kursy',
    component: CoursesComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_STUDENT', 'ROLE_TEACHER']
    }
  },
  {
    path: 'kursy/:id',
    component: CourseDetailsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'lekcja/:id',
    component: LessonsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'lekcja/:id/test',
    component: ExamComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'dodaj-test',
    component: AddExamComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'lekcja/:id/materiały',
    component: MaterialComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'lekcja/:id/zadania',
    component:TasksComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'lekcja/:id/ogłoszenia',
    component: AnnouncementsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'dodaj-wydarzenie/:date',
    component: AddEventComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'dodaj-materiał',
    component: AddMaterialComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'zadania/:id',
    component: TaskDetailsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
