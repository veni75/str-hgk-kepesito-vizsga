import { TestBed } from '@angular/core/testing';

import { SchoolHttpService } from './school-http.service';

describe('SchoolHttpService', () => {
  let service: SchoolHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
