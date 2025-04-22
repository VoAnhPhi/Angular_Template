import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProductAddComponent } from './ad-product-add.component';

describe('AdProductAddComponent', () => {
  let component: AdProductAddComponent;
  let fixture: ComponentFixture<AdProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdProductAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
