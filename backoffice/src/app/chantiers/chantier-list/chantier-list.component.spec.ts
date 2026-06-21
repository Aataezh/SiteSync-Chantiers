import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantierListComponent } from './chantier-list.component';

describe('ChantierListComponent', () => {
  let component: ChantierListComponent;
  let fixture: ComponentFixture<ChantierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChantierListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChantierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
