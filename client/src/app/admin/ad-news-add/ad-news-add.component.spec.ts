import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsAddComponent } from './ad-news-add.component';

describe('AdNewsAddComponent', () => {
  let component: AdNewsAddComponent;
  let fixture: ComponentFixture<AdNewsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
