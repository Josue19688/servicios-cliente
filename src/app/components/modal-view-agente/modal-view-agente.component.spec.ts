import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewAgenteComponent } from './modal-view-agente.component';

describe('ModalViewAgenteComponent', () => {
  let component: ModalViewAgenteComponent;
  let fixture: ComponentFixture<ModalViewAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewAgenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
