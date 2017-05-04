import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Vote } from '../vote';
import { RandomVotesService } from '../random-votes.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  votes: Vote[];

  constructor(private router: Router, private randomVotesService: RandomVotesService) {

    randomVotesService.votes$.subscribe(votes => {
      this.votes = votes;
    });

  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd))
        return;
      this.randomVotesService.fetchVotes().then(votes => {
        this.randomVotesService.votes = votes;
      });
    });

  }

}
