import { TestBed } from '@angular/core/testing';

import { ChangelogServiceService } from './changelog-service.service';

describe('ChangelogServiceService', () => {
  let service: ChangelogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangelogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
