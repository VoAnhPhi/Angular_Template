import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUserEditComponent } from './ad-user-edit.component';

describe('AdUserEditComponent', () => {
  let component: AdUserEditComponent;
  let fixture: ComponentFixture<AdUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdUserEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
