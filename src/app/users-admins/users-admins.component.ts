import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from "../api-models";

@Component({
  selector: 'app-users-admins',
  templateUrl: './users-admins.component.html',
  styleUrls: ['./users-admins.component.css']
})
export class UsersAdminsComponent implements OnChanges{
  @Input()
  allUsers: User[] = [];
  usersAdmins: User[] = [];

  ngOnChanges(changes: SimpleChanges) {
    //this.actualCourses.push(this.allCourses[i]);
    //co jezeli ngOnChanges wykona sie 2x -> 2x wiecej elementów w actualCoursers
    //this.actualCourses = []; trzeba wyzerowac przed dodaniem
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].roles.includes("ADMIN")) {
        this.usersAdmins.push(this.allUsers[i]);
      }
    }
  }
}
