import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesVacacionesComponent } from './agentes-vacaciones.component';

describe('AgentesVacacionesComponent', () => {
  let component: AgentesVacacionesComponent;
  let fixture: ComponentFixture<AgentesVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentesVacacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentesVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
