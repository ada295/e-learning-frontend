import {Component, OnInit} from '@angular/core';
import {Teacher} from "../api-models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: Teacher[] = [
    {"name": "Andrzej", "surname": "Ziomek", "email": "and@zio.pl", "id":2},
    {"name": "Andrzej1", "surname": "Ziomek1", "email": "and@zio.pl", "id":3}
  ];

  displayedColumns: string[] = ['name', 'surname', 'email'];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit():void {
    // this.httpClient.get<Teacher[]>("http://localhost:8080/teachers")
    //   .subscribe(teachers => this.teachers = teachers);
  }
}
