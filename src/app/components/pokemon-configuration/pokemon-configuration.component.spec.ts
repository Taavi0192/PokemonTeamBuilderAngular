import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonConfigurationComponent } from './pokemon-configuration.component';

describe('PokemonConfigurationComponent', () => {
  let component: PokemonConfigurationComponent;
  let fixture: ComponentFixture<PokemonConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
