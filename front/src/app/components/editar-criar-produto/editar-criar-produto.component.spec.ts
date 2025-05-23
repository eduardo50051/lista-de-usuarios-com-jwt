import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCriarProdutoComponent } from './editar-criar-produto.component';

describe('EditarCriarProdutoComponent', () => {
  let component: EditarCriarProdutoComponent;
  let fixture: ComponentFixture<EditarCriarProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCriarProdutoComponent]
    });
    fixture = TestBed.createComponent(EditarCriarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
