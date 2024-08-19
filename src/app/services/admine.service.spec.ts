import { TestBed } from '@angular/core/testing';

import { AdmineService } from './admine.service';

describe('AdmineService', () => {
  let service: AdmineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
