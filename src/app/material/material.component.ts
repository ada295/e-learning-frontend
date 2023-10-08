import {Component, HostListener} from '@angular/core';
import {Lesson, Material, Task, TaskToDo} from "../api-models";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {SessionService} from "../session.service";


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, public sessionService: SessionService) {
  }

  lessonId: string | null = '0';
  lesson: Lesson | undefined;

  materials: Material [] | undefined;

  ngOnInit(){
    this.setAmountOfColumns(window.innerWidth);

    this.loadMaterials();
  }

  private loadMaterials() {
    let id = this.route.snapshot.paramMap.get('id');
    this.lessonId = id;

    this.httpClient.get<Lesson>("http://localhost:8080/lessons/" + id).subscribe(lesson => this.lesson = lesson);
    this.httpClient.get<Material []>("http://localhost:8080/lessons/" + id + "/materials").subscribe(material => this.materials = material)
  }

  downloadMaterial(material: Material) {
    this.httpClient.get(`http://localhost:8080/materials/${material.id}/download`,
      {responseType: 'blob'}).subscribe((blob) => {
      saveAs(blob, material.filename);
    })
  }


  deleteMaterial(id: number) {
    this.httpClient.delete("http://localhost:8080/materials/" + id + "/delete").subscribe(()=> this.loadMaterials());
  }


  tasks: Task [] | undefined;
  tasksStudent: TaskToDo[] | undefined;
  desired_columns = 3;
  desired_row_height = '2:1';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setAmountOfColumns(event.target.innerWidth);
  }

  getHeaderAmountOfColumnsInGrid() {
    if (this.desired_columns < 3) {
      return 1;
    } else {
      return 3;
    }
  }

  getHeaderRowHeightInGrid() {
    if (this.desired_columns == 2) {
      return '8:1';
    } else if (this.desired_columns == 1) {
      return '5:1';
    } else {
      return '5:1';
    }
  }

  private setAmountOfColumns(width: any) {
    this.desired_columns = Math.trunc(width / 400);
  }
}
