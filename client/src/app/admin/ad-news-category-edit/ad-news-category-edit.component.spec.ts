import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsCategoryEditComponent } from './ad-news-category-edit.component';

describe('AdNewsCategoryEditComponent', () => {
  let component: AdNewsCategoryEditComponent;
  let fixture: ComponentFixture<AdNewsCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsCategoryEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
