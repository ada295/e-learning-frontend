import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Announcement, Lesson} from "../api-models";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent {
  announcementGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  }
