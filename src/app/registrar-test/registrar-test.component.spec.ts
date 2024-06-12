import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTestComponent } from './registrar-test.component';

describe('RegistrarTestComponent', () => {
  let component: RegistrarTestComponent;
  let fixture: ComponentFixture<RegistrarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
