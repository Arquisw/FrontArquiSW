import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercanosotrosComponent } from './acercanosotros.component';

describe('AcercanosotrosComponent', () => {
  let component: AcercanosotrosComponent;
  let fixture: ComponentFixture<AcercanosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercanosotrosComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AcercanosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
