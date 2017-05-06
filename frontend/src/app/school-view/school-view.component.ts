import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { School } from '../school';
import { SchoolService } from '../school.service';
import { NoticeService } from '../notice.service';

import { getRanking } from '../utils';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.scss']
})
export class SchoolViewComponent implements OnInit {
  school: School;
  vote_counter: number;
  schools: School[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schoolService: SchoolService,
    private noticeService: NoticeService
  ) {

    schoolService.school$.subscribe(school => {
      this.vote_counter = 1;
      this.school = school;
    });
    schoolService.schools$.subscribe(schools => {
      this.schools = schools;
    });

  }

  getRanking(sortBy: string): number {

    return getRanking(this.school, this.schools, sortBy);

  }

  moreVotes(): void {

    this.vote_counter += 10;

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.schoolService.fetchSchool(+params['id'])
        .then(school => {
          this.schoolService.school = school;
        })
        .catch(error => {
          this.noticeService.notice = "존재하지 않는 페이지입니다. 메인 페이지로 돌아갑니다.";
          this.router.navigateByUrl('/');
        });
    });

  }

}
