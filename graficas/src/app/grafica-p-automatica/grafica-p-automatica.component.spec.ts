import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPAutomaticaComponent } from './grafica-p-automatica.component';

describe('GraficaPAutomaticaComponent', () => {
  let component: GraficaPAutomaticaComponent;
  let fixture: ComponentFixture<GraficaPAutomaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaPAutomaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaPAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
