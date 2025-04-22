import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsCategoryAddComponent } from './ad-news-category-add.component';

describe('AdNewsCategoryAddComponent', () => {
  let component: AdNewsCategoryAddComponent;
  let fixture: ComponentFixture<AdNewsCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsCategoryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
