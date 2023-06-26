import {Component} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {Lesson} from "../api-models";
import {TasksComponent} from "../tasks/tasks.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

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

export class CalendarComponent {



  events = [
    {
      day: 23,
      month: 7,
      year: 2023,
      description: "",
      type: "START_EXAM",
      hour: 10,
      minutes: 30,
      lesson: {
        course: undefined,
        id: 0,
        name: ""
      }
    },
    {
      day: 23,
      month: 7,
      year: 2023,
      description: "",
      type: "DEADLINE_TASK",
      hour: 17,
      minutes: 0,
      lesson: Lesson
    },
    {
      day: 22,
      month: 5,
      year: 2023,
      description: "",
      type: "DEADLINE_TASK",
      hour: 19,
      minutes: 0,
      lesson: Lesson
    },
    {
      day: 26,
      month: 2,
      year: 2024,
      description: "Wycieczka do zoo",
      type: "OTHER",
      hour: 9,
      minutes: 5
    }
  ];
  selected: Date | DateRange<Date> | null = new Date();

  getDateClass = (date: Date) => {
    for (let event of this.events) {
      if (event.day === date.getDate() && (event.month - 1) === date.getMonth()
        && event.year === date.getFullYear()) {
        return 'event-on-calendar';
      }
    }
    return '';
  }
}
