import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import { CoursesComponent } from './courses/courses.component';
import {MatTabsModule} from "@angular/material/tabs";
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseLayoutComponent } from './course-layout/course-layout.component';
import { ActualCoursesComponent } from './actual-courses/actual-courses.component';
import { FinishedCoursesComponent } from './finished-courses/finished-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LessonsComponent } from './lessons/lessons.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import { ExamComponent } from './exam/exam.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { AddCourseComponent } from './add-course/add-course/add-course.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddTeacherComponent } from './add-teacher/add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers/teachers.component';
import {MatLegacyTableModule} from "@angular/material/legacy-table";
import { LoginComponent } from './login/login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { JoinCourseComponent } from './join-course/join-course.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoursesComponent,
    AllCoursesComponent,
    CourseLayoutComponent,
    ActualCoursesComponent,
    FinishedCoursesComponent,
    CourseDetailsComponent,
    LessonsComponent,
    ExamComponent,
    AddCourseComponent,
    AddTeacherComponent,
    TeachersComponent,
    LoginComponent,
    CalendarComponent,
    JoinCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatLegacyTableModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
