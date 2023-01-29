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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoursesComponent,
    AllCoursesComponent,
    CourseLayoutComponent,
    ActualCoursesComponent,
    FinishedCoursesComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
