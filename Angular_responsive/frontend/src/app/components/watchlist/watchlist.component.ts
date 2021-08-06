import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  // @ViewChild('noItemsAlert', {static: false}) noItemsAlert;

  constructor(private _observer: BreakpointObserver) { }

  public watchlist = [];

  mediaGroups = [];
  mediaGroupsMobile = [];

  public isMobile = false;

  ngOnInit(): void {
    this.getWatchlist();
    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
    })
  }

  private getWatchlist() {
    if (localStorage.getItem("watchlist")) {
      this.watchlist = JSON.parse(localStorage.getItem("watchlist"));
      this.mediaGroups = this.divideMedias(6);
      this.mediaGroupsMobile = this.divideMedias(1);
    }
  }


  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.watchlist.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.watchlist[i]);
      }
      else {
        mediaGroups[j].push(this.watchlist[i]);
      }
    }
    return mediaGroups;
  }
}
