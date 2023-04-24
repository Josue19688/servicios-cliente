import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesSuspendidosComponent } from './agentes-suspendidos.component';

describe('AgentesSuspendidosComponent', () => {
  let component: AgentesSuspendidosComponent;
  let fixture: ComponentFixture<AgentesSuspendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentesSuspendidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentesSuspendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
