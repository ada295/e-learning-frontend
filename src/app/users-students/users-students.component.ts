import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from "../api-models";

@Component({
  selector: 'app-users-students',
  templateUrl: './users-students.component.html',
  styleUrls: ['./users-students.component.css']
})
export class UsersStudentsComponent implements OnChanges{
  @Input()
  allUsers: User[] = [];
  usersStudents: User[] = [];

  ngOnChanges(changes: SimpleChanges) {
    //this.actualCourses.push(this.allCourses[i]);
    //co jezeli ngOnChanges wykona sie 2x -> 2x wiecej elementów w actualCoursers
    //this.actualCourses = []; trzeba wyzerowac przed dodaniem
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].roles.includes("STUDENT")) {
        this.usersStudents.push(this.allUsers[i]);
      }
    }
  }
}
