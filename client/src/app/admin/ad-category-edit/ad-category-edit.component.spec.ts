import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryEditComponent } from './ad-category-edit.component';

describe('AdCategoryEditComponent', () => {
  let component: AdCategoryEditComponent;
  let fixture: ComponentFixture<AdCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdCategoryEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
