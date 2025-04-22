import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsCategoryComponent } from './ad-news-category.component';

describe('AdNewsCategoryComponent', () => {
  let component: AdNewsCategoryComponent;
  let fixture: ComponentFixture<AdNewsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
