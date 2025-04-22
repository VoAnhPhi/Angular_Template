import { TestBed } from '@angular/core/testing';

import { AdminOderService } from './admin-oder.service';

describe('AdminOderService', () => {
  let service: AdminOderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
