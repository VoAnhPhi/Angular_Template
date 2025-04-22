import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsEditComponent } from './ad-news-edit.component';

describe('AdNewsEditComponent', () => {
  let component: AdNewsEditComponent;
  let fixture: ComponentFixture<AdNewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
