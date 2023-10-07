import {Component} from '@angular/core';
import {Announcement, Lesson} from "../api-models";
import {catchError, of} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }


  addAnnouncement() {
    let id = this.route.snapshot.paramMap.get('id');

    if (this.announcementGroup.valid) {
      let announcementRequest = new Announcement();
      if (this.announcementGroup.value.name)
        announcementRequest.name = this.announcementGroup.value.name;
      if (this.announcementGroup.value.description)
        announcementRequest.description = this.announcementGroup.value.description;
      // pobierz id z linku
      this.httpClient.post<Lesson>("http://localhost:8080/courses/" + id + "/announcements", announcementRequest)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(value => {
          alert("Ogłoszenie zostało dodane!");
          this.router.navigateByUrl("/kursy/" + id + "/ogloszenia");
        });
    } else {
      alert("Błędy w formularzu!");
    }
  }
}
