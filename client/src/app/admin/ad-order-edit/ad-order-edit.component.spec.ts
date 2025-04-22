import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOrderEditComponent } from './ad-order-edit.component';

describe('AdOrderEditComponent', () => {
  let component: AdOrderEditComponent;
  let fixture: ComponentFixture<AdOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdOrderEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
