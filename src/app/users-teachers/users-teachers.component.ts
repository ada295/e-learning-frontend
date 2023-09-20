import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from "../api-models";

@Component({
  selector: 'app-users-teachers',
  templateUrl: './users-teachers.component.html',
  styleUrls: ['./users-teachers.component.css']
})
export class UsersTeachersComponent implements OnChanges {
  @Input()
  allUsers: User[] = [];
  usersTeachers: User[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].roles.includes("TEACHER")) {
        this.usersTeachers.push(this.allUsers[i]);
      }
    }
  }
}
