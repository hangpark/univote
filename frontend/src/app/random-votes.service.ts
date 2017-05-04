import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { Vote } from './vote';

@Injectable()
export class RandomVotesService {
  private _votes$ = new BehaviorSubject<Vote[]>([]);
  private votesUrl = "https://univote.kr/api/votes/random/";

  constructor(private http: Http) { }

  set votes(votes: Vote[]) {

    this._votes$.next(votes);

  }

  get votes$(): Observable<Vote[]> {

    return this._votes$;

  }

  fetchVotes(): Promise<Vote[]> {

    return this.http.get(this.votesUrl)
      .toPromise()
      .then(response => response.json() as Vote[])

  }

}
