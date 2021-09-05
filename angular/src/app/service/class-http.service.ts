import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../models/classroom';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ClassHttpService extends BaseHttpService<Classroom> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'classroom';
   }
}
