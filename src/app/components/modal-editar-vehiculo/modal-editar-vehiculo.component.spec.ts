import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarVehiculoComponent } from './modal-editar-vehiculo.component';

describe('ModalEditarVehiculoComponent', () => {
  let component: ModalEditarVehiculoComponent;
  let fixture: ComponentFixture<ModalEditarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
