import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUserAddComponent } from './ad-user-add.component';

describe('AdUserAddComponent', () => {
  let component: AdUserAddComponent;
  let fixture: ComponentFixture<AdUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdUserAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
