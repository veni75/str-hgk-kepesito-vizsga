import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school';
import { SchoolHttpService } from 'src/app/service/school-http.service';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css']
})
export class SchoolFormComponent implements OnInit {

  schoolId: string;
  schoolForm: School = {name:'', street:"", city:"", zipcode:0}

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolHttpService,
    private router: Router) { }

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.params.id;
    if(this.schoolId){
      this.schoolService.getById(this.schoolId).subscribe(
        data => {
          this.schoolForm = data;
        }
      )
    }
  }

  saveSchool(form: NgForm){
    if(this.schoolId){
      this.schoolService.update(form.value, this.schoolId).subscribe(
        school => this.router.navigate(['school-list']),
        err => console.error(err)
      )
    }else {
      this.schoolService.save(form.value).subscribe(
        school => this.router.navigate(['school-list']),
        err => console.error(err)
      )
    }

  }
}
