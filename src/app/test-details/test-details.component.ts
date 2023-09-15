import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Announcement, Lesson} from "../api-models";
import {catchError, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit{

  lessonId: string | null = '0';


  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
   this.lessonId = this.route.snapshot.paramMap.get('id');
  }


}
