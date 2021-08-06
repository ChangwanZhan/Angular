import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopularMediaComponent } from './components/popular-media/popular-media.component';
import { ImagelistCarouselComponent } from './components/imagelist-carousel/imagelist-carousel.component';
import { TopRatedMediaComponent } from './components/top-rated-media/top-rated-media.component';
import { TrendingMediaComponent } from './components/trending-media/trending-media.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import { ModalComponent } from './components/modal/modal.component';
import { ContinueWatchingComponent } from './components/continue-watching/continue-watching.component';
import { FooterComponent } from './components/footer/footer.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { RecommendMediaComponent } from './components/recommend-media/recommend-media.component';
import { SimiliarMediaComponent } from './components/similiar-media/similiar-media.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WatchlistComponent,
    NavBarComponent,
    PopularMediaComponent,
    ImagelistCarouselComponent,
    TopRatedMediaComponent,
    TrendingMediaComponent,
    MediaDetailsComponent,
    ModalComponent,
    ContinueWatchingComponent,
    FooterComponent,
    MediaCardComponent,
    RecommendMediaComponent,
    SimiliarMediaComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        YouTubePlayerModule,
        LayoutModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
