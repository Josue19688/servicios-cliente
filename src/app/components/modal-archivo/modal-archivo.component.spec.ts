import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchivoComponent } from './modal-archivo.component';

describe('ModalArchivoComponent', () => {
  let component: ModalArchivoComponent;
  let fixture: ComponentFixture<ModalArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
