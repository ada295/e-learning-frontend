import {Component, Input} from '@angular/core';
import {User} from "../api-models";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  @Input()
  allUsers: User[] = [];
}
