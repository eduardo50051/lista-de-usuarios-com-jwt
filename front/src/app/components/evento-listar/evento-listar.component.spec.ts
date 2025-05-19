import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoListarComponent } from './evento-listar.component';

describe('EventoListarComponent', () => {
  let component: EventoListarComponent;
  let fixture: ComponentFixture<EventoListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoListarComponent]
    });
    fixture = TestBed.createComponent(EventoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
