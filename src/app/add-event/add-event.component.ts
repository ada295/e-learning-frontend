import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {Lesson} from "../api-models";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-calendar',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  selected: Date | DateRange<Date> | null = new Date();

  constructor(private httpClient: HttpClient, public sessionService: SessionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let dateString = this.route.snapshot.paramMap.get('date');
    if(dateString) {
      let  date= new Date(dateString);
      console.log(date);
    }
  }

  addEvent() {
    console.log("Dodano")
  }


  createEvent() {

  }
}



