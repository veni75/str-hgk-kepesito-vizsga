import { TestBed } from '@angular/core/testing';
import { Student } from '../models/student';

import { BaseHttpService } from './base-http.service';

describe('BaseHttpService', () => {
  let service: BaseHttpService<Student>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
