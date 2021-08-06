import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MediaService} from "../../services/media.service";
import {YouTubePlayerModule} from '@angular/youtube-player';
import {CastService} from "../../services/cast.service";
import {NgbActiveModal, NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";


@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaDetailsComponent implements OnInit {
  public mediaCat: string;
  public mediaId: string;
  public mediaKey = "";
  public mediaLink = "";

  public mediaDetail = {
    genres: "",
    spoken_languages: "",
    overview: "",
    vote_average: "",
    tagline: "",
    runtime: "",
    name: "",
    url_name: "",
    year: "",
    poster_path: "",
    numbers: ""
  }
  public casts = []
  public reviews = []
  public isMobile = false;

  // alert
  private _success = new Subject<string>();
  public addMessage = "Added to watchlist";
  public removeMessage = "Removed from watchlist";
  public addButton = "Add to Watchlist";
  public removeButton = "Remove from Watchlist"

  public watchlistButton = "";
  public watchlistMessage = "";
  public alertType = "danger"
  staticAlertClosed = false;
  closeMessage = '';


  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private route: ActivatedRoute, private mediaService: MediaService, private castService: CastService, private modalService: NgbModal,private _observer: BreakpointObserver) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.closeMessage = message);

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
    })
    this.mediaCat = this.route.snapshot.paramMap.get('mediaCat');
    this.mediaId = this.route.snapshot.paramMap.get('mediaId');
    this.getMediaVideo();
    this.getMediaDetail();
    this.getMediaCast();
    this.getMediaReview();
    this.initWatchlistAlert();
  }

  public updateWatchlistValue() {
    this._success.next("open");
    if (this.watchlistButton == this.addButton) {
      this.watchlistButton = this.removeButton;
      this.alertType = "success";
      this.watchlistMessage = this.addMessage;
      this.addToWatchlist(this.getMediaInfo());
    } else {
      this.watchlistButton = this.addButton;
      this.alertType = "danger";
      this.watchlistMessage = this.removeMessage;
      this.removeFromWatchlist();
    }
  }

  private getMediaVideo(): void {
    this.mediaService.getMediaVideo(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        this.mediaKey = data.key;
        this.mediaLink = `https://www.youtube.com/watch?v=${data.key}`
      }
    )
  }

  private cvtMinuteToHours(minute): string {
    let hours = Math.floor(minute / 60);
    let minutes = minute % 60;
    if (hours === 0) {
      return `${minutes}mins`
    }
    if (minutes === 0) {
      return `${hours}hrs`
    }
    return `${hours}hrs ${minutes}mins`
  }

  private getMediaInfo(): any{
    return {
      name: this.mediaDetail.name,
      id: this.mediaId,
      media_type: this.mediaCat,
      poster_path: this.mediaDetail.poster_path
    }
  }

  private getMediaDetail(): void {
    this.mediaService.getMediaDetail(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        let numbers = [];
        if (data.genres && data.genres != "") {
          this.mediaDetail.genres = data.genres;
        }
        if (data.date && data.date != "") {
          this.mediaDetail.year = data.date.split("-")[0];
          numbers.push(this.mediaDetail.year);
        }
        if (data.spoken_languages && data.spoken_languages != "") {
          this.mediaDetail.spoken_languages = data.spoken_languages;
        }
        if (data.overview && data.overview != "") {
          this.mediaDetail.overview = data.overview;
        }
        if (data.vote_average && data.vote_average != 0) {
          this.mediaDetail.vote_average = data.vote_average;
          numbers.push(this.mediaDetail.vote_average);
        }
        if (data.tagline && data.tagline != "") {
          this.mediaDetail.tagline = data.tagline;
        }
        if (data.name && data.name != "") {
          this.mediaDetail.name = data.name
          this.mediaDetail.url_name = data.name.split(" ").join("%20");
        }

        if (data.runtime && data.runtime != 0) {
          this.mediaDetail.runtime = this.cvtMinuteToHours(data.runtime);
          numbers.push(this.mediaDetail.runtime);
        }
        this.mediaDetail.poster_path = data.poster_path;
        this.addToContinueWatching(this.getMediaInfo());

        // {{mediaDetail.year}} | &#9733;{{mediaDetail.vote_average}} | {{mediaDetail.runtime}}
        this.mediaDetail.numbers = numbers.join(" | ");
      }
    )
  }

  private getMediaCast(): void {
    this.castService.getMediaCast(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        this.casts = data;
      }
    )
  }

  openModal(castId ,profilePath) {
    this.castService.getCastDetail(castId).toPromise().then(
      data => {
        let castInfo = data;
        this.castService.getCastIds(castId).toPromise().then(
          data => {
            const modalRef = this.modalService.open(ModalComponent,  { windowClass : "myCustomModalClass", centered: true});
            modalRef.componentInstance.castInfo = castInfo;
            modalRef.componentInstance.profilePath = profilePath;
            modalRef.componentInstance.castIds = data;
          }
        )
      }
    )
  }

  private getMediaReview(): void {
    this.mediaService.getMediaReview(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        this.reviews = data;
      }
    )
  }


  private initWatchlistAlert() {
    let catId = `${this.mediaCat}-${this.mediaId}`;
    if (this.checkIsInLocalStorage("watchlistVisited", catId)) {
      this.watchlistMessage = this.removeMessage;
      this.watchlistButton = this.removeButton;
      this.alertType = "danger";
    } else {
      this.watchlistMessage = this.addMessage;
      this.watchlistButton = this.addButton;
      this.alertType = "success";
    }
  }


  private addToContinueWatching(media): void {
    let catId = `${this.mediaCat}-${this.mediaId}`;
    this.addToLocalStorage("continue", media, "continueVisited", catId);
  }

  private addToWatchlist(media): void {
    let catId = `${this.mediaCat}-${this.mediaId}`;
    this.addToLocalStorage("watchlist", media, "watchlistVisited", catId);
  }

  private removeFromWatchlist(): void {
    let catId = `${this.mediaCat}-${this.mediaId}`;
    this.removeFromLocalStorage("watchlist", "watchlistVisited", catId);
  }

  private checkIsInLocalStorage(key: string, val: string): boolean{
    let prevStored = [];
    if (localStorage.getItem(key)) {
      prevStored = localStorage.getItem(key).split(",");
    }
    let visited = new Set(prevStored);
    return visited.has(val);
  }

  private addToLocalStorage(key: string, val: any, visited_key: string, check_val: string): void {
    // if visited, removed; if not visited, do nothing
    this.removeFromLocalStorage(key, visited_key, check_val);

    // add current value to visited
    let prevStored = []
    if (localStorage.getItem(visited_key)) {
      prevStored = localStorage.getItem(visited_key).split(",");
    }
    prevStored.push(check_val);
    localStorage.setItem(visited_key, prevStored.join(","));

    // if not visited, add to local storage
    prevStored = [];
    if (localStorage.getItem(key)) {
      prevStored = JSON.parse(localStorage.getItem(key));
    }
    prevStored.unshift(val);
    localStorage.setItem(key, JSON.stringify(prevStored));
  }

  private removeFromLocalStorage(key: string, visited_key: string, check_val: string): void{
    // check if visited
    if (!this.checkIsInLocalStorage(visited_key, check_val)) return;

    // remove current value from visited
    let prevStored = []
    if (localStorage.getItem(visited_key)) {
      prevStored = localStorage.getItem(visited_key).split(",");
    }
    let visited = new Set(prevStored);
    visited.delete(check_val);
    prevStored = Array.from(visited);
    localStorage.setItem(visited_key, prevStored.join(","));

    // remove value from watchlist
    prevStored = [];
    if (localStorage.getItem(key)) {
      prevStored = JSON.parse(localStorage.getItem(key));
    }
    let cat = check_val.split("-")[0];
    let id = check_val.split("-")[1];
    let idx = -1;
    for (let i = 0; i < prevStored.length; i++) {
      if (prevStored[i].id == id && prevStored[i].media_type == cat) {
        idx = i;
        break;
      }
    }
    if (idx < 0) return;
    prevStored.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(prevStored));
  }

}


