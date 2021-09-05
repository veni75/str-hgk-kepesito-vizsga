import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/app/models/classroom';
import { ClassHttpService } from 'src/app/service/class-http.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  classes: Classroom[] = [];
  newClassName: string = '';

  constructor(
    private classroomService: ClassHttpService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(){
    this.classroomService.getAll().subscribe(
      (classes: Classroom[]) => {
        console.log(classes);
        this.classes = classes;
      },
      err => console.log(err)
    )

  }

  updateClass(id:string, input: any){
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
