import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Classroom } from 'src/app/models/classroom';
import { School } from 'src/app/models/school';
import { ClassHttpService } from 'src/app/service/class-http.service';
import { SchoolHttpService } from 'src/app/service/school-http.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  schoolId: string;
  activeSchool: School;

  classes: Classroom[] = [{_id:"3", name: "2B"}, {_id: "er", name:"3B"}];
  newClassName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schoolService: SchoolHttpService,
    private classroomService: ClassHttpService) { }

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.params.id;

    if(this.schoolId){
      this.getClasses();
    }
  }

  getClasses(){
    this.schoolService.getClassroomBySchoolId(this.schoolId).subscribe(
      (classes: Classroom[]) => this.classes = classes,
      err => console.log(err)
    )

  }

  updateClass(id:string, input: any){
    console.log(input.value, id);
    this.classroomService.update({name: input.value}, id).subscribe(
      ()=> this.getClasses(),
      err => console.error(err)
    )
  }

  addClass(){
    if(this.newClassName !== ''){
      this.classroomService.save({name:this.newClassName}).subscribe(
        (data)=> this.getClasses(),
        err => console.error(err)
      )
    }
  }

}
