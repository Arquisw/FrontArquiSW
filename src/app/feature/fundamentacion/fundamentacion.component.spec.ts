import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentacionComponent } from './fundamentacion.component';

describe('FundamentacionComponent', () => {
  let component: FundamentacionComponent;
  let fixture: ComponentFixture<FundamentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundamentacionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(FundamentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
