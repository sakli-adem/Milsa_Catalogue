import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposParfums } from './apropos-parfums';

describe('AproposParfums', () => {
  let component: AproposParfums;
  let fixture: ComponentFixture<AproposParfums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproposParfums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposParfums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
