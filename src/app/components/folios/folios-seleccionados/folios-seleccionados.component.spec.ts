import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliosSeleccionadosComponent } from './folios-seleccionados.component';

describe('FoliosSeleccionadosComponent', () => {
  let component: FoliosSeleccionadosComponent;
  let fixture: ComponentFixture<FoliosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoliosSeleccionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoliosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
