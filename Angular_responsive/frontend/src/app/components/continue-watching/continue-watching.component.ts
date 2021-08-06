import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent implements OnInit {

  @Input() isMobile: boolean;
  constructor() { }

  title = "Continue Watching";

  ngOnInit(): void {
    this.getContinueWatchingMedias();
    this.displayContinueWatching();
  }

  continueWatchingMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private getContinueWatchingMedias(): void {
    if (localStorage.getItem("continue")) {
      this.continueWatchingMedias = JSON.parse(localStorage.getItem("continue")).slice(0, 24);
    }
    this.mediaGroupsMobile = this.divideMedias(1);
    this.mediaGroups = this.divideMedias(6);
  }


  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.continueWatchingMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.continueWatchingMedias[i]);
      }
      else {
        mediaGroups[j].push(this.continueWatchingMedias[i]);
      }
    }
    return mediaGroups;
  }

  private displayContinueWatching(): void {
    if (!localStorage.getItem("continue") || JSON.parse(localStorage.getItem("continue")).length <= 0) {
      document.getElementById("continue-watching").style.display = "None";
    } else {
      document.getElementById("continue-watching").style.display = "block";
    }
  }

}
