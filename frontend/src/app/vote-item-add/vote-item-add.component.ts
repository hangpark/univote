import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Headers, Http } from '@angular/http';

import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

import { School } from '../school';
import { SchoolService } from '../school.service';
import { VoteService } from '../vote.service';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-vote-item-add',
  templateUrl: './vote-item-add.component.html',
  styleUrls: ['./vote-item-add.component.scss']
})
export class VoteItemAddComponent implements OnInit {
  user_id: number;
  user_name: string;
  schools: School[];
  searchResults: School[];
  school: School;
  image: File;
  imageUrl: string;
  comment: string;
  invalidForm: boolean;

  constructor(
    private fb: FacebookService,
    private router: Router,
    private schoolService: SchoolService,
    private voteService: VoteService,
    private noticeService: NoticeService,
    private http: Http
  ) {

    this.invalidForm = false;
    this.checkLoginStatus();
    this.searchResults = [];
    schoolService.schools$.subscribe(schools => {
      this.schools = schools;
    });

  }

  checkLoginStatus(): void {
    
    this.fb.getLoginStatus()
      .then(response => {
        return this.voteService.checkVote(+response.authResponse.userID)
          .then(() => {
            this.noticeService.notice = "이미 인증샷을 등록하셨습니다. 본인 페이지로 이동합니다.";
            this.router.navigateByUrl('/' + response.authResponse.userID);
          })
          .catch(error => {
            this.fetchName();
          });
      })
      .catch(error => Promise.reject(error.message || error));

  }

  fetchName(): Promise<any> {

    return this.fb.api('/me', 'get', {locale: 'ko_KR'})
      .then(response => {
        this.user_id = response.id;
        this.user_name = response.name;
      })
      .catch(error => Promise.reject(error.message || error));

  }

  search(term: string): void {

    if (!term || term.length === 0) {
      this.searchResults = [];
      return;
    }
    let searchResults = this.schools.filter(s => {
      return -1 !== s.name.toLowerCase().replace(/ /g, '')
        .indexOf(term.toLowerCase().replace(/ /g, ''));
    });
    let index = searchResults.indexOf(this.school);
    if (index > -1)
      searchResults.splice(index, 1);
    this.searchResults = searchResults;

  }

  onSchoolChange(school: School, searchBox: HTMLInputElement): void {
    this.school = school;
    searchBox.value = "";
    this.search(searchBox.value);
  }

  onImageChange(imageBox: HTMLInputElement): void {

    if (!imageBox.files || !imageBox.files[0])
      return;

    this.image = imageBox.files[0];

    let reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    reader.readAsDataURL(imageBox.files[0]);

  }

  onCommentChange(commentBox: HTMLInputElement): void {
    this.comment = commentBox.value;
  }

  onSubmit(): void {

    this.fb.login()
      .then(() => this.fetchName())
      .then(() => this.checkValidity())
      .then(() => this.createVote())
      .then(() => {
        this.noticeService.notice = "등록되었습니다! 당신의 소중한 한 표로 인해 대한민국이 바뀝니다.";
        this.router.navigateByUrl('/' + this.user_id);
      })
      .catch(error => Promise.reject(error.message || error));

  }

  checkValidity() {

    if (!this.user_id || !this.user_name || !this.school || !this.image) {
      this.invalidForm = true;
      throw false;
    }
    this.invalidForm = false;

  }

  createVote(): Promise<any> {

    let data = new FormData();
    data.append('user_id', this.user_id);
    data.append('user_name', this.user_name);
    data.append('school', this.school.id);
    data.append('image', this.image);
    data.append('comment', this.comment ? this.comment : '');

    return this.voteService.createVote(data, this.user_id);

  }

  ngOnInit() {
  }

}
