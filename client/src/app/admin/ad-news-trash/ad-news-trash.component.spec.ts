import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewsTrashComponent } from './ad-news-trash.component';

describe('AdNewsTrashComponent', () => {
  let component: AdNewsTrashComponent;
  let fixture: ComponentFixture<AdNewsTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNewsTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewsTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
