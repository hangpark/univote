import { Component, OnInit } from '@angular/core';

import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

import { School } from './school';
import { SchoolService } from './school.service';
import { Vote } from './vote';
import { NoticeService } from './notice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  totalNum: number;
  notice: string;

  constructor(
    private fb: FacebookService,
    private schoolService: SchoolService,
    private noticeService: NoticeService
  ) {

    fb.init({
      appId: '108176659752108',
      xfbml: true,
      version: 'v2.8'
    });

    schoolService.schools$.subscribe(schools => {
      if (schools)
        this.totalNum = this.getTotalNum(schools);
    });

    noticeService.notice$.subscribe(notice => {
      this.notice = notice;
      if (notice)
        setTimeout(() => noticeService.notice = undefined, 3000);
    });

  }

  fetchSchools(): void {

    this.schoolService.fetchSchools().then(schools => this.schoolService.schools = schools);

  }

  getTotalNum(schools: School[]): number {
    return schools.map(s => s.vote_num).reduce((n1, n2) => n1 + n2, 0);
  }
 
  ngOnInit(): void {

    this.fetchSchools();

  }

}
