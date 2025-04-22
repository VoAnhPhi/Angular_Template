import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBycategoryComponent } from './products-bycategory.component';

describe('ProductsBycategoryComponent', () => {
  let component: ProductsBycategoryComponent;
  let fixture: ComponentFixture<ProductsBycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsBycategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsBycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
