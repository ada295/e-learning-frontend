import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionService} from "../session.service";
import {User} from "../api-models";

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.css']
})
export class UsersLayoutComponent {
  @Input()
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];


  constructor(public sessionService: SessionService) {
  }
}
