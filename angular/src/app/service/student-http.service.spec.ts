import { TestBed } from '@angular/core/testing';

import { StudentHttpService } from './student-http.service';

describe('StudentHttpService', () => {
  let service: StudentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
