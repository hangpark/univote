import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticeService {
  private _notice$ = new BehaviorSubject<string>(undefined);

  set notice(notice: string) {

    this._notice$.next(notice);

  }

  get notice$(): Observable<string> {
    
    return this._notice$;

  }

  constructor() { }

}
