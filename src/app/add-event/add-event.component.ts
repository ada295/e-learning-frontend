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
    let date = this.route.snapshot.paramMap.get('date');
    console.log(date);
    //2023-5-23
    //2023-10-20
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
      if (this.selected.getDate() < 10 && this.selected.getMonth()+1 < 10) {
        return "0" + this.selected.getDate() + "-" + "0" +(this.selected.getMonth()+1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getDate() < 10) {
        return "0" + this.selected.getDate() + "-" +(this.selected.getMonth()+1) + "-" + this.selected.getFullYear();
      } else if (this.selected.getMonth()+1 < 10) {
        return this.selected.getDate() + "-" + "0" +(this.selected.getMonth()+1) + "-" + this.selected.getFullYear();
      } else return this.selected.getDate() + "-" + (this.selected.getMonth()+1) + "-" + this.selected.getFullYear();
    }
    return "";
  }
}






