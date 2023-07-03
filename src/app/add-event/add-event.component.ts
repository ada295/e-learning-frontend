import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-calendar',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{

  selected: Date | DateRange<Date> | null = new Date();

  eventGroup = this.formBuilder.group({
    name: ['', Validators.required],
    time: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, public sessionService: SessionService, private route: ActivatedRoute){};

  createEvent() {

  }

  ngOnInit(): void {
  }
}






