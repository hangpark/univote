import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vote } from './vote';

@Injectable()
export class VoteService {
  private headers = new Headers({'enctype': 'multipart/form-data'});
  private voteUrl = "https://univote.kr/api/votes/";

  constructor(private http: Http) { }

  fetchVote(user_id: number): Promise<Vote> {

    return this.http.get(this.voteUrl + user_id + "/")
      .toPromise()
      .then(response => response.json() as Vote);

  }

  checkVote(user_id: number): Promise<Response> {

    return this.http.head(this.voteUrl + user_id + "/").toPromise();

  }

  createVote(data: FormData, user_id: number): Promise<any> {

    return this.http.post(this.voteUrl + user_id + "/", data, this.headers)
      .toPromise()

  }

}
