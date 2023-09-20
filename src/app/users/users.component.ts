import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {User} from "../api-models";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers: User[] = [];

  constructor(private httpClient:HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.httpClient.get<User[]>("http://localhost:8080/users")
      .subscribe(users => {
        for (let i = 0; i < users.length; i++) {
          users[i].customLink = '/uzytkownicy/' + users[i].id;
        }
        this.allUsers = users;
      });

  }
}
