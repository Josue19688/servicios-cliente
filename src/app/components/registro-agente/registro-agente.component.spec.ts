import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAgenteComponent } from './registro-agente.component';

describe('RegistroAgenteComponent', () => {
  let component: RegistroAgenteComponent;
  let fixture: ComponentFixture<RegistroAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAgenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
