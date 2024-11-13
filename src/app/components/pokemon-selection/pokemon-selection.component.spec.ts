import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectionComponent } from './pokemon-selection.component';

describe('PokemonSelectionComponent', () => {
  let component: PokemonSelectionComponent;
  let fixture: ComponentFixture<PokemonSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
