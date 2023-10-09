import {Component} from '@angular/core';
import {User} from "../api-models";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  edit = false;
  user: User = new User();

  formGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.min(2)]],
    lastName: ['', [Validators.required, Validators.min(2)]],
    email: ['', [Validators.required, Validators.min(2), Validators.email]],
    password: ['', [Validators.max(50)]]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private formBuilder: FormBuilder, public sessionService: SessionService) {

  }

  switchEdit() {
    this.edit = !this.edit;
  }

  ngOnInit(): void {
    this.edit = false;

    this.http.get<User>("http://localhost:8080/my-profile/")
      .subscribe((user) => {
        this.user = user;
        this.formGroup.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email
        })
      });
  }

  cancelEdit() {
    this.ngOnInit();
  }

  save() {
    if (this.formGroup.valid) {
      this.http.post<User>("http://localhost:8080/edit-profile/", this.formGroup.value)
        .subscribe((user) => {
          this.ngOnInit();
        });
    } else {
      alert("Popraw dane w formularzu!");
    }
  }
}
