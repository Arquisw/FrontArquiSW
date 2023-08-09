import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenieriaDeRequisitosComponent } from './ingenieria-de-requisitos.component';

describe('IngenieriaDeRequisitosComponent', () => {
  let component: IngenieriaDeRequisitosComponent;
  let fixture: ComponentFixture<IngenieriaDeRequisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngenieriaDeRequisitosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IngenieriaDeRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
