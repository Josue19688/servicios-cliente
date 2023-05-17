import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAgenteComponent } from './modal-editar-agente.component';

describe('ModalEditarAgenteComponent', () => {
  let component: ModalEditarAgenteComponent;
  let fixture: ComponentFixture<ModalEditarAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAgenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
