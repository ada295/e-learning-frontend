import { Component } from '@angular/core';
import {Material} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  materials: Material [] | undefined;

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get<Material []>("http://localhost:8080/lessons/" + id + "/materials").subscribe(material => this.materials = material)
  }

  downloadMaterial(material: Material) {
    this.httpClient.get(`http://localhost:8080/materials/${material.id}/download`,
      {responseType: 'blob'}).subscribe((blob) => {
      saveAs(blob, material.filename);
    })
  }


}
