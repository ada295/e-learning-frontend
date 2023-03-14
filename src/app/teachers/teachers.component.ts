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
    {"name": "Andrzej", "surname": "Ziomek1", "email": "and@zio.pl", "id":3},
    {"name": "Andrzej", "surname": "Ziomek2", "email": "and@zio.pl", "id":4},
    {"name": "Andrzej", "surname": "Ziomek3", "email": "and@zio.pl", "id":5},
    {"name": "Andrzej1", "surname": "Ziomek4", "email": "and@zio.pl", "id":6},
    {"name": "Andrzej1", "surname": "Ziomek5", "email": "and@zio.pl", "id":7},
    {"name": "Andrzej1", "surname": "Ziomek6", "email": "and@zio.pl", "id":8},
    {"name": "Andrzej1", "surname": "Ziomek7", "email": "and@zio.pl", "id":9},
    {"name": "Andrzej1", "surname": "Ziomek8", "email": "and@zio.pl", "id":10}
  ];

  displayedColumns: string[] = ['name', 'surname', 'email'];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit():void {
    this.httpClient.get<Teacher[]>("http://localhost:8080/teachers")
      .subscribe(teachers => this.teachers = teachers);
  }

  test(){
    console.log("aaaaaa")
  }
}
