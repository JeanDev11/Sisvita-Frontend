import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestAnsiedadService } from './test-ansiedad.service';

describe('TestAnsiedadService', () => {
  let service: TestAnsiedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestAnsiedadService]
    });
    service = TestBed.inject(TestAnsiedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});