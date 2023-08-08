import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEliminacionesComponent } from './administrar-eliminaciones.component';

describe('AdministrarEliminacionesComponent', () => {
  let component: AdministrarEliminacionesComponent;
  let fixture: ComponentFixture<AdministrarEliminacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarEliminacionesComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarEliminacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
