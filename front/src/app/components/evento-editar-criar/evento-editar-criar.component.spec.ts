import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoEditarCriarComponent } from './evento-editar-criar.component';

describe('EventoEditarCriarComponent', () => {
  let component: EventoEditarCriarComponent;
  let fixture: ComponentFixture<EventoEditarCriarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoEditarCriarComponent]
    });
    fixture = TestBed.createComponent(EventoEditarCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
