import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-top-rated-media',
  templateUrl: './top-rated-media.component.html',
  styleUrls: ['./top-rated-media.component.css']
})
export class TopRatedMediaComponent implements OnInit {

  @Input() mediaCat: string;
  @Input() isMobile: boolean;
  constructor(private mediaService: MediaService) { }

  title: string;

  ngOnInit(): void {
    this.generateTitle();
    this.getTopRatedMedias();
  }

  topRatedMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private generateTitle(): void {
    if (this.mediaCat == "movie") {
      this.title = "Top Rated Movies"
    } else {
      this.title = "Top Rated TV Shows"
    }
  }

  private getTopRatedMedias(): void{
    this.mediaService.getTopRatedMedias(this.mediaCat).toPromise().then(
      data => {
        this.topRatedMedias = data.slice(0, 24);
        this.mediaGroupsMobile = this.divideMedias(1);
        this.mediaGroups = this.divideMedias(6);
      }
    )
  }

  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.topRatedMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.topRatedMedias[i]);
      }
      else {
        mediaGroups[j].push(this.topRatedMedias[i]);
      }
    }
    return mediaGroups;
  }
}
