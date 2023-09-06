import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";
import {Course} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-gradebook-details',
  templateUrl: './gradebook-details.component.html',
  styleUrls: ['./gradebook-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GradebookDetailsComponent implements OnInit {
  courseName: string | null | undefined;
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'grade'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;
  expandedElementChild: PeriodicElement | null | undefined;

  constructor(private httpClient: HttpClient, public sessionService: SessionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseName = this.route.snapshot.paramMap.get('courseName');
    this.httpClient.get<Course[]>("http://localhost:8080/courses")
  }
}

export interface PeriodicElement {
  name: string;
  grade: number;
  description: string;
  studentName: string;
  studentSurname: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    grade: 4,
    name: 'Odpowiedź ustna',
    description: `Odpowieź ustna z wiedzy dotyczącej świata roślin i zwierząt`,
    studentName: "Jan",
    studentSurname: "Kowalski"
  },
  {
    grade: 5,
    name: 'Aktywność',
    description: `Praca nad wybranym projektem w grupach. Praca grupy objawiająca się licznymi pomysłami, komunikatywnością i dobrym podziełem pracy.`,
    studentName: "Jan",
    studentSurname: "Kowalski"
  },
];

