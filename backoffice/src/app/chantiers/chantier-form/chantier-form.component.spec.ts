import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantierFormComponent } from './chantier-form.component';

describe('ChantierFormComponent', () => {
  let component: ChantierFormComponent;
  let fixture: ComponentFixture<ChantierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChantierFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChantierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
