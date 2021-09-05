import { TestBed } from '@angular/core/testing';

import { ClassHttpService } from './class-http.service';

describe('ClassHttpService', () => {
  let service: ClassHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
