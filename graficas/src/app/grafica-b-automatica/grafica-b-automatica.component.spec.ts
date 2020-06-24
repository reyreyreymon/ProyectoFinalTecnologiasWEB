import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBAutomaticaComponent } from './grafica-b-automatica.component';

describe('GraficaBAutomaticaComponent', () => {
  let component: GraficaBAutomaticaComponent;
  let fixture: ComponentFixture<GraficaBAutomaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaBAutomaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
