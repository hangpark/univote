import { Component, OnInit } from '@angular/core';

import { Vote } from '../vote';
import { RandomVotesService } from '../random-votes.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  votes: Vote[];

  constructor(private randomVotesService: RandomVotesService) {

    randomVotesService.fetchVotes().then(votes => {
      randomVotesService.votes = votes;
    });
    randomVotesService.votes$.subscribe(votes => {
      this.votes = votes;
    });

  }

  ngOnInit() {
  }

}
