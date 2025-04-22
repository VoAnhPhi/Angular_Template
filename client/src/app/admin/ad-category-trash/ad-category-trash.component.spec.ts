import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryTrashComponent } from './ad-category-trash.component';

describe('AdCategoryTrashComponent', () => {
  let component: AdCategoryTrashComponent;
  let fixture: ComponentFixture<AdCategoryTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdCategoryTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdCategoryTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
