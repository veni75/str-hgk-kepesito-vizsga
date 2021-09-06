import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { School } from 'src/app/models/school';
import { SchoolHttpService } from 'src/app/service/school-http.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  schools: Observable<School[]> = this.schoolService.getAll();

  constructor(private router: Router, private schoolService: SchoolHttpService) { }

  ngOnInit(): void {
  }

  editSchool(id: string){
    this.router.navigate(['school', 'edit', id]);
  }

  editClassroom(){
    this.router.navigate(['classroom-list']);
  }


}
