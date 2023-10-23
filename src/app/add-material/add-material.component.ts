import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Material} from "../api-models";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  materialInformation = false;
  materialGroup = this.formBuilder.group({
    description: ['', Validators.required],
    // file: [File, Validators.required]
    // description: ['', Validators.required],
  })
  fileName = '';
  formData = new FormData();

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.formData.append("file", file);
      this.formData.append("fileName", file.name);
      this.formData.append("fileType", file.type);
    }
  }

  uploadFile() {

    if (this.formData.get('file')) {

      let material = {
        "name": this.formData.get('fileName'),
        "description": this.materialGroup.value.description,
        "type": "OTHER",
        "filename": this.formData.get('fileName')
      }
      let lessonId = this.route.snapshot.paramMap.get('id');
      this.httpClient.post<Material>(`http://localhost:8080/lessons/${lessonId}/materials`, material)
        .subscribe(e => {
          const upload$ = this.httpClient.post(`http://localhost:8080/materials/${e.id}/upload`, this.formData);

          upload$.subscribe(() => {
            this.router.navigate([`/lekcja/${lessonId}/materiały`]);
          });
        });
    }

  }
}
