import { TestBed } from '@angular/core/testing';

import { SightingsService } from './sightings.service';

describe('SightingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SightingsService = TestBed.get(SightingsService);
    expect(service).toBeTruthy();
  });
});
