import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteBajaComponent } from './agente-baja.component';

describe('AgenteBajaComponent', () => {
  let component: AgenteBajaComponent;
  let fixture: ComponentFixture<AgenteBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenteBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenteBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
