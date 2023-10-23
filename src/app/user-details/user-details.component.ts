import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../api-models";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  edit = false;
  user: User = new User();

  formGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.min(2)]],
    lastName: ['', [Validators.required, Validators.min(2)]],
    email: ['', [Validators.required, Validators.min(2), Validators.email]],
    password: ['',[Validators.max(50)]]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private formBuilder: FormBuilder) {

  }

  switchEdit() {
    this.edit = !this.edit;
  }

  ngOnInit(): void {
    this.edit = false;
    let id = this.route.snapshot.paramMap.get('id');

    this.http.get<User>("http://localhost:8080/users/" + id)
      .subscribe((user) => {
        this.user = user;
        this.formGroup.patchValue({
          id: this.user.id + '',
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
    let id = this.route.snapshot.paramMap.get('id');
    if (id && this.formGroup.valid) {
      this.user.id = parseInt(id);
      this.http.post<User>("http://localhost:8080/change-data-as-admin/", this.formGroup.value)
        .subscribe((user) => {
          this.router.navigateByUrl("/uzytkownicy");
        });
    } else {
      alert("Popraw dane w formularzu!");
    }
  }

  disableAccount() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user.id = parseInt(id);
      this.user.disabledAccount = true;
      this.http.post<User>("http://localhost:8080/change-data-as-admin/", this.user)
        .subscribe((user) => {
          this.router.navigateByUrl("/uzytkownicy");
        });
    }
  }

  enableAccount() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user.id = parseInt(id);
      this.user.disabledAccount = false;
      this.http.post<User>("http://localhost:8080/change-data-as-admin/", this.user)
        .subscribe((user) => {
          this.router.navigateByUrl("/uzytkownicy");
        });
    }
  }
}
