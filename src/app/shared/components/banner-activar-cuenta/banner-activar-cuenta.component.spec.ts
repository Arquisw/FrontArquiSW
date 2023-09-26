import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerActivarCuentaComponent } from './banner-activar-cuenta.component';

describe('BannerActivarCuentaComponent', () => {
  let component: BannerActivarCuentaComponent;
  let fixture: ComponentFixture<BannerActivarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerActivarCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerActivarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
