import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  materialInformation = false;
  examGroup = this.formBuilder.group({
    name: ['', Validators.required],
    // file: [File, Validators.required]
    // description: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  addMaterial() {
    if (this.examGroup.valid) {
      this.materialInformation = true;
    }
  }


  fileName = '';

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.httpClient.post("/api/thumbnail-upload", formData);

      upload$.subscribe();
    }
  }

}
