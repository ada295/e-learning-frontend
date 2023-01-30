import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Course} from "../api-models";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute, private httpClient:HttpClient) {
  }



  ngOnInit() {
    //pobranie wartości z adresu URL /kursy/:id
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<Course>("http://localhost:8080/courses/"+id)
  }
}
