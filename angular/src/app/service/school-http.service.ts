import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';
import { School } from '../models/school';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolHttpService extends BaseHttpService<School> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'school';
  }

  getClassroomBySchoolId(id: string):Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.BASE_URL}${this.entity}/classes/${id}`)
  }
}
