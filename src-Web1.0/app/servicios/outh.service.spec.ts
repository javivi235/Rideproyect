import { TestBed, inject } from '@angular/core/testing';

import { OuthService } from './outh.service';

describe('OuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuthService]
    });
  });

  it('should be created', inject([OuthService], (service: OuthService) => {
    expect(service).toBeTruthy();
  }));
});
