import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { School } from './school';

@Injectable()
export class SchoolService {
  private _schools$ = new BehaviorSubject<School[]>(undefined);
  private _school$ = new BehaviorSubject<School>(undefined);
  private schoolUrl = "https://univote.kr/api/schools/";

  constructor(private http: Http) { }

  set schools(schools: School[]) {

    this._schools$.next(schools);

  }

  get schools$(): Observable<School[]> {

    return this._schools$;

  }

  set school(school: School) {

    this._school$.next(school);

  }

  get school$(): Observable<School> {

    return this._school$;

  }

  fetchSchools(): Promise<School[]> {

    return this.http.get(this.schoolUrl)
      .toPromise()
      .then(response => {
        return response.json().map(obj => new School().fromJson(obj));
      })
      .catch(error => {
        Promise.reject(error.message || error);
      });

  }

  fetchSchool(id: number): Promise<School> {

    return this.http.get(this.schoolUrl + id + "/")
      .toPromise()
      .then(response => new School().fromJson(response.json()))

  }

}
