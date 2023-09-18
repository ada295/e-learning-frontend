import {Component, OnInit} from '@angular/core';
import {User} from "../api-models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: User[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit():void {
    this.httpClient.get<User[]>("http://localhost:8080/teachers")
      //UWAGA!!!! NA BACKENDZIE POBRAĆ TYLKO UŻYTKOWNIKÓW Z ROLĄ TEACHER!!!
      .subscribe(teachers => this.teachers = teachers);
  }

  test(){
    console.log("aaaaaa")
  }
}
