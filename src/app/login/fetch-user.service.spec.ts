import { TestBed, inject } from '@angular/core/testing';

import { FetchUserService } from './fetch-user.service';

describe('FetchUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchUserService]
    });
  });

  it('should be created', inject([FetchUserService], (service: FetchUserService) => {
    expect(service).toBeTruthy();
  }));
});
