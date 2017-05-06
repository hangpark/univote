import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { FacebookModule } from 'ngx-facebook';
import { VoteItemViewComponent } from './vote-item-view/vote-item-view.component';
import { VoteItemAddComponent } from './vote-item-add/vote-item-add.component';
import { RankListComponent } from './rank-list/rank-list.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { SchoolService } from './school.service';
import { VoteService } from './vote.service';
import { RandomVotesService } from './random-votes.service';
import { NoticeService } from './notice.service';
import { SchoolViewComponent } from './school-view/school-view.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteItemViewComponent,
    VoteItemAddComponent,
    RankListComponent,
    ImageGalleryComponent,
    SchoolViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: VoteItemAddComponent},
      {path: ':user_id', component: VoteItemViewComponent},
      {path: ':schools/:id', component: SchoolViewComponent}
    ])
  ],
  providers: [SchoolService, VoteService, RandomVotesService, NoticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
