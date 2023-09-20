import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ExamComponent} from "./exam/exam.component";
import {AddCourseComponent} from "./add-course/add-course/add-course.component";
import {AddUserComponent} from "./add-user/add-user.component";
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
import {AddLessonComponent} from "./add-lesson/add-lesson.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {GradebookComponent} from "./gradebook/gradebook.component";
import {GradebookDetailsComponent} from "./gradebook-details/gradebook-details.component";
import {AddAnnouncementComponent} from "./add-announcement/add-announcement.component";
import {TestDetailsComponent} from "./test-details/test-details.component";
import {AddGradeComponent} from "./add-grade/add-grade.component";
import {UsersComponent} from "./users/users.component";

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
    path: 'dziennik',
    component: GradebookComponent,
    canActivate: [LoggedUserGuard,RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'dziennik/:courseName/:id',
    component: GradebookDetailsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'dodaj-ocene/:courseName/:id/:studentId',
    component: AddGradeComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'uzytkownicy',
    component: UsersComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
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
    path: 'rejestracja',
    component: AddUserComponent,
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
    path: 'lekcja/:id/test-opis',
    component: TestDetailsComponent,
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
    path: 'lekcja/:id/dodaj-materiał',
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
  },
  {
    path: 'dodaj-lekcję',
    component: AddLessonComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'dodaj-ogloszenie',
    component: AddAnnouncementComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  },
  {
    path: 'kursy/:id/ogloszenia',
    component: AnnouncementsComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: 'lekcja/:id/dodaj-zadanie',
    component: AddTaskComponent,
    canActivate: [LoggedUserGuard, RoleAccessGuard],
    data: {
      roles: ['ROLE_TEACHER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
