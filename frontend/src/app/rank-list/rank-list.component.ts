import { Component, OnInit } from '@angular/core';

import { School } from '../school';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss']
})
export class RankListComponent implements OnInit {
  schools: any;

  constructor(private schoolService: SchoolService) {

    this.schools = {};
    schoolService.schools$.subscribe(schools => {
      this.schools.orig = schools;
      this.initSchools('vote_rate');
      this.initSchools('vote_num');
    });

  }

  initSchools(sortBy: string): void {

    if (!this.schools.orig)
      return;

    this.schools[sortBy] = {
      list: this.schools.orig.concat().sort((s1, s2) => {
        if (s1[sortBy] < s2[sortBy])
          return 1;
        if (s1[sortBy] > s2[sortBy])
          return -1;
        return 0;
      }),
      counter: 5
    };

  }

  moreSchools(sortBy: string): void {

    this.schools[sortBy].counter += 10;

  }

  getRanking(school: School, sortBy: string): number {

    return this.schools[sortBy].list.map(s => s[sortBy])
      .indexOf(school[sortBy]) + 1;

  }

  ngOnInit() {
  }

}
