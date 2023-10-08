import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {CalendarEvent} from "../api-models";
import {catchError, of} from "rxjs";


@Component({
  selector: 'app-calendar',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  selected: Date | DateRange<Date> | null = new Date();

  eventGroup = this.formBuilder.group({
    name: ['', Validators.required],
    time: ['', Validators.required],
  })

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient, public sessionService: SessionService, private route: ActivatedRoute) {
  };


  ngOnInit(): void {
    let date = this.route.snapshot.paramMap.get('date');
    let dateParts = date?.split("-");
    if (this.selected != null && this.selected instanceof Date) {
      if (dateParts != undefined) {
        this.selected.setFullYear(parseInt(dateParts[0]));
        this.selected.setMonth(parseInt(dateParts[1]) - 1);
        this.selected.setDate(parseInt(dateParts[2]))
      }
    }
  }

  selectedDateAsString() {
    if (this.selected != null && this.selected instanceof Date) {
      if (this.selected.getDate() < 10 && this.selected.getMonth() + 1 < 10) {
        return "0" + this.selected.getDate() + "-" + "0" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getDate() < 10) {
        return "0" + this.selected.getDate() + "-" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getMonth() + 1 < 10) {
        return this.selected.getDate() + "-" + "0" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
      } else return this.selected.getDate() + "-" + (this.selected.getMonth() + 1) + "-" + this.selected.getFullYear();
    }
    return "";
  }


  createEvent() {
    if (this.eventGroup.valid) {

      let event = new CalendarEvent();

      if (this.selected != null && this.selected instanceof Date) {
        event.year = this.selected.getFullYear();
        event.month = this.selected.getMonth() + 1;
        event.day = this.selected.getDate();

        event.type = "OTHER";

        event.description = this.eventGroup.value.name ? this.eventGroup.value.name : "";
        let hourAndMinutes = this.eventGroup.value.time?.split(":");
        if (hourAndMinutes != null) {
          event.hour = parseInt(hourAndMinutes[0]);
          event.minutes = parseInt(hourAndMinutes[1])
        }
        this.httpClient.post<CalendarEvent>("http://localhost:8080/calendar-events", event)
          .pipe(
            catchError(error => {
              alert(error.error);
              return of([]);
            })
          )
          .subscribe(value => {
              alert("Wydarzenie dodane!");
              this.router.navigateByUrl("/kalendarz");
            }
          )
        ;
      }
    } else {
      alert("Popraw błędy w formularzu!");
    }
  }
}







