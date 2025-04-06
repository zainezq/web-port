import { TestBed } from '@angular/core/testing';

import { ContentAggregatorService } from './content-aggregator.service';

describe('ContentAggregatorService', () => {
  let service: ContentAggregatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentAggregatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
