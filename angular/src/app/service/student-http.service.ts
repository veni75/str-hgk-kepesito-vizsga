import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentHttpService extends BaseHttpService<Student> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'student';
   }
}
