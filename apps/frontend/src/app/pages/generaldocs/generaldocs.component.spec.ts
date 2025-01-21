import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraldocsComponent } from './generaldocs.component';

describe('GeneraldocsComponent', () => {
  let component: GeneraldocsComponent;
  let fixture: ComponentFixture<GeneraldocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneraldocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneraldocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
