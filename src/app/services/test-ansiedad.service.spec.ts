import { TestBed } from '@angular/core/testing';

import { TestAnsiedadService } from './test-ansiedad.service';

describe('TestAnsiedadService', () => {
  let service: TestAnsiedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAnsiedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
