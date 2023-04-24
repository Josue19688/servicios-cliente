import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaViewComponent } from './visita-view.component';

describe('VisitaViewComponent', () => {
  let component: VisitaViewComponent;
  let fixture: ComponentFixture<VisitaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
