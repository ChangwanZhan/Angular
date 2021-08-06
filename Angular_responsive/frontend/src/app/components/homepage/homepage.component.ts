import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {MediaService} from "../../services/media.service";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class HomepageComponent implements OnInit {

  public movie = "movie";
  public tv = "tv";
  public isMobile = false;

  constructor(private mediaService: MediaService, private _observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.getCurrentPlayingMedia();
    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
    })
  }

  moviePlaceHolder = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg';
  movieNameDefault = "N/A"

  defaultMovie = {
    backdrop_path: this.moviePlaceHolder,
    name: this.movieNameDefault,
    id: "",
  }

  currentPlayingMovie = [this.defaultMovie, this.defaultMovie, this.defaultMovie, this.defaultMovie, this.defaultMovie]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  private getCurrentPlayingMedia(): void{
    this.mediaService.getCurrentlyPlayingMovies().toPromise().then(
      data => {
        this.currentPlayingMovie = data;
      }
    )
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
