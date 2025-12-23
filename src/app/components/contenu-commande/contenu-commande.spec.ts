import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuCommande } from './contenu-commande';

describe('ContenuCommande', () => {
  let component: ContenuCommande;
  let fixture: ComponentFixture<ContenuCommande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuCommande]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuCommande);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
