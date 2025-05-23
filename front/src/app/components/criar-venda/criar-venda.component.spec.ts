import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarVendaComponent } from './criar-venda.component';

describe('CriarVendaComponent', () => {
  let component: CriarVendaComponent;
  let fixture: ComponentFixture<CriarVendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarVendaComponent]
    });
    fixture = TestBed.createComponent(CriarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
