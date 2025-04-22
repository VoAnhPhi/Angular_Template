import { TestBed } from '@angular/core/testing';

import { AdminNewsCategoryService } from './admin-news-category.service';

describe('AdminNewsCategoryService', () => {
  let service: AdminNewsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminNewsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
