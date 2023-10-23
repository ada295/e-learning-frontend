import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {Lesson} from "../api-models";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {catchError, of} from "rxjs";


export class CalendarEvent {
  id: number | undefined
  day: number | undefined
  month: number | undefined
  year: number | undefined
  description: string | undefined
  type: string | undefined
  hour: number | undefined
  minutes: number | undefined
  lesson: Lesson | undefined
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: CalendarEvent[] = [];
  eventsLoaded = false;
  selected: Date | DateRange<Date> | null = new Date();

  constructor(private httpClient: HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.httpClient.get<CalendarEvent[]>("http://localhost:8080/calendar-events")
      .subscribe(events => {
        this.events = events;
        this.eventsLoaded = true;
      })

  }

  getDateClass = (date: Date) => {
    for (let event of this.events) {
      if (event.day === date.getDate() && (event.month) === (date.getMonth() + 1)
        && event.year === date.getFullYear()) {
        return 'event-on-calendar';
      }
    }
    return '';
  }

  showEvents() {
    let eventsList = [];
    for (let event of this.events) {
      if (this.selected != null && this.selected instanceof Date) {
        if (event.day === this.selected.getDate() && (event.month) === (this.selected.getMonth() + 1)
          && (event.year) === this.selected.getFullYear()) {
            eventsList.push(event);
        }
      }
    }

    return eventsList;
  }

  addEvent() {
    console.log("Dodano")
  }


  createEvent() {

  }

  selectedDateAsString() {
    if (this.selected != null && this.selected instanceof Date) {
      return this.selected.getFullYear() + "-" + (this.selected.getMonth()+1) + "-" + this.selected.getDate();
    }
    return "";
  }

  delete(id: any) {
    if (confirm("Czy na pewno chcesz usunąć wydarzenie?")) {

      this.httpClient.delete<CalendarEvent>("http://localhost:8080/calendar-events/" + id)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value => {
            this.ngOnInit();
          }
        )
      ;
    }
  }

  getTimeString(event: CalendarEvent) {
    let time = "";
    if (event.hour != undefined && event.hour < 10) {
      time += "0" + event.hour + ":";
    } else {
      time += event.hour + ":";
    }

    if (event.minutes != undefined && event.minutes < 10) {
      time += "0" + event.minutes;
    } else {
      time += event.minutes;
    }
    return time;
  }
}
