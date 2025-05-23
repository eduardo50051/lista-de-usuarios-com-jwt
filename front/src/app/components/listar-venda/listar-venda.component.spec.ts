import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendaComponent } from './listar-venda.component';

describe('ListarVendaComponent', () => {
  let component: ListarVendaComponent;
  let fixture: ComponentFixture<ListarVendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVendaComponent]
    });
    fixture = TestBed.createComponent(ListarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
