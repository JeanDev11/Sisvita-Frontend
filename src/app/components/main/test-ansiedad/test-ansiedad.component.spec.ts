import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestAnsiedadComponent } from './test-ansiedad.component';
import { TestAnsiedadService } from '../../../services/test-ansiedad.service';

describe('TestAnsiedadComponent', () => {
  let component: TestAnsiedadComponent;
  let fixture: ComponentFixture<TestAnsiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnsiedadComponent, HttpClientTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestAnsiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
