import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOrderDetailComponent } from './ad-order-detail.component';

describe('AdOrderDetailComponent', () => {
  let component: AdOrderDetailComponent;
  let fixture: ComponentFixture<AdOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdOrderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
