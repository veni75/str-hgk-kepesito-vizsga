import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentHttpService } from 'src/app/service/student-http.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList: Observable<Student[]> = this.studentService.getAll();

  constructor(
    private router: Router,
     private studentService: StudentHttpService
     ) { }

  ngOnInit(): void {
  }

  editStudent(id:string){
    this.router.navigate(['student', 'edit', id]);
  }

}
