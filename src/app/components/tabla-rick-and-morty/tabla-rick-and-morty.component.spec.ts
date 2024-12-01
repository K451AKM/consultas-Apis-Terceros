import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRickAndMortyComponent } from './tabla-rick-and-morty.component';

describe('TablaRickAndMortyComponent', () => {
  let component: TablaRickAndMortyComponent;
  let fixture: ComponentFixture<TablaRickAndMortyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaRickAndMortyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaRickAndMortyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
