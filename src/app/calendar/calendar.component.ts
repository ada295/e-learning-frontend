import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {Course, Lesson} from "../api-models";
import {TasksComponent} from "../tasks/tasks.component";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";


export class CalendarEvent {
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

  constructor(private httpClient: HttpClient, public sessionService: SessionService) {
  }

  ngOnInit(): void{
    this.httpClient.get<CalendarEvent[]>("http://localhost:8080/calendar-events")
      .subscribe(events => {
        this.events = events;
      })

  }

  selected: Date | DateRange<Date> | null = new Date();

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

  }
}
