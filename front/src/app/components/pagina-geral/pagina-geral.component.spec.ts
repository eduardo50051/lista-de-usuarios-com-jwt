import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGeralComponent } from './pagina-geral.component';

describe('PaginaGeralComponent', () => {
  let component: PaginaGeralComponent;
  let fixture: ComponentFixture<PaginaGeralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaGeralComponent]
    });
    fixture = TestBed.createComponent(PaginaGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
