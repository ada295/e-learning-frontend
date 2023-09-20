import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionService} from "../session.service";
import {User} from "../api-models";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.css']
})
export class UsersLayoutComponent implements OnInit, OnChanges {
  @Input()
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.users;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.users;
  }
}
