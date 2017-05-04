import { TestBed, inject } from '@angular/core/testing';

import { RandomVotesService } from './random-votes.service';

describe('RandomVotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomVotesService]
    });
  });

  it('should ...', inject([RandomVotesService], (service: RandomVotesService) => {
    expect(service).toBeTruthy();
  }));
});
