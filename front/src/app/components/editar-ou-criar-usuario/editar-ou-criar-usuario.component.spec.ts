import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOuCriarUsuarioComponent } from './editar-ou-criar-usuario.component';

describe('EditarOuCriarUsuarioComponent', () => {
  let component: EditarOuCriarUsuarioComponent;
  let fixture: ComponentFixture<EditarOuCriarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarOuCriarUsuarioComponent]
    });
    fixture = TestBed.createComponent(EditarOuCriarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
