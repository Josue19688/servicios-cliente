import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchivoEditarComponent } from './modal-archivo-editar.component';

describe('ModalArchivoEditarComponent', () => {
  let component: ModalArchivoEditarComponent;
  let fixture: ComponentFixture<ModalArchivoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalArchivoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalArchivoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
