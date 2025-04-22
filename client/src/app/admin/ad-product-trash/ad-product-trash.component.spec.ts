import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProductTrashComponent } from './ad-product-trash.component';

describe('AdProductTrashComponent', () => {
  let component: AdProductTrashComponent;
  let fixture: ComponentFixture<AdProductTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdProductTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdProductTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
