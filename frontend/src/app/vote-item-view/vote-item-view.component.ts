import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FacebookService, UIParams } from 'ngx-facebook';

import { School } from '../school';
import { SchoolService } from '../school.service';
import { Vote } from '../vote';
import { VoteService } from '../vote.service';
import { NoticeService } from '../notice.service';

import { getRanking } from '../utils';

@Component({
  selector: 'app-vote-item-view',
  templateUrl: './vote-item-view.component.html',
  styleUrls: ['./vote-item-view.component.scss'],
})
export class VoteItemViewComponent implements OnInit {
  vote: Vote;
  school: School;
  schools: School[];

  constructor(
    private fb: FacebookService,
    private route: ActivatedRoute,
    private router: Router,
    private schoolService: SchoolService,
    private voteService: VoteService,
    private noticeService: NoticeService
  ) {

    schoolService.schools$.subscribe(schools => {
      this.schools = schools;
      this.fetchSchool();
    });

  }

  fetchSchool(): void {

    if (this.schools && this.vote)
      this.school = this.schools.find(school => school.id === this.vote.school);

  }

  getRanking(school: School, sortBy: string): number {
    
    return getRanking(school, this.schools, sortBy);

  }

  getAbsolutePath(): string {
    return window.location.href;
  }

  sharePage(): void {

    const params: UIParams = {
      method: 'share',
      app_id: '108176659752108',
      href: this.getAbsolutePath()
    };
    this.fb.ui(params);

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.schoolService.fetchSchools().then(schools => this.schoolService.schools = schools);
      this.vote = undefined;
      this.voteService.fetchVote(+params['user_id'])
        .then(vote => {
          this.vote = vote;
          this.fetchSchool();
        })
        .catch(error => {
          this.noticeService.notice = "존재하지 않는 페이지입니다. 메인 페이지로 돌아갑니다.";          
          this.router.navigateByUrl('/');
        });
    });
    
  }

}
