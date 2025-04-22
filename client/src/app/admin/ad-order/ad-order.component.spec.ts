import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOrderComponent } from './ad-order.component';

describe('AdOrderComponent', () => {
  let component: AdOrderComponent;
  let fixture: ComponentFixture<AdOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
