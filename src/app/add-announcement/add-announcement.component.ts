import { Component } from '@angular/core';
import {Announcement, Lesson} from "../api-models";
import {catchError, of} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {

  announcementGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  addAnnouncement() {
    if (this.announcementGroup.valid) {
      let announcementRequest = new Announcement();
      if (this.announcementGroup.value.name)
        announcementRequest.name = this.announcementGroup.value.name;
      if (this.announcementGroup.value.description)
        announcementRequest.description = this.announcementGroup.value.description;
      // pobierz id z linku
      this.httpClient.post<Lesson>("http://localhost:8080/course/1/announcement", announcementRequest)
        .pipe(
          catchError(error => {
            alert(error.error);
            return of([]);
          })
        )
        .subscribe(value =>
          //kolko przestaje sie krecic
          alert("Ogłoszenie zostało dodane!")
        );
    }
  }
}
