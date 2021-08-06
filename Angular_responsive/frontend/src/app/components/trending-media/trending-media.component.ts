import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-trending-media',
  templateUrl: './trending-media.component.html',
  styleUrls: ['./trending-media.component.css']
})
export class TrendingMediaComponent implements OnInit {

  @Input() mediaCat: string;
  @Input() isMobile: boolean;
  constructor(private mediaService: MediaService) { }

  title: string;

  ngOnInit(): void {
    this.generateTitle();
    this.getTrendingMedias();
  }

  trendingMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private generateTitle(): void {
    if (this.mediaCat == "movie") {
      this.title = "Trending Movies"
    } else {
      this.title = "Trending TV Shows"
    }
  }

  private getTrendingMedias(): void{
    this.mediaService.getTrendingMedias(this.mediaCat).toPromise().then(
      data => {
        this.trendingMedias = data.slice(0, 24);
        this.mediaGroupsMobile = this.divideMedias(1);
        this.mediaGroups = this.divideMedias(6);
      }
    )
  }

  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.trendingMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.trendingMedias[i]);
      }
      else {
        mediaGroups[j].push(this.trendingMedias[i]);
      }
    }
    return mediaGroups;
  }

}
