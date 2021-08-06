import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-popular-media',
  templateUrl: './popular-media.component.html',
  styleUrls: ['./popular-media.component.css']
})
export class PopularMediaComponent implements OnInit {
  @Input() mediaCat: string;
  @Input() isMobile: boolean;
  constructor(private mediaService: MediaService) { }

  title: string;

  ngOnInit(): void {
    this.generateTitle();
    this.getPopularMedias();
  }

  popularMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private generateTitle(): void {
    if (this.mediaCat == "movie") {
      this.title = "Popular Movies"
    } else {
      this.title = "Popular TV Shows"
    }
  }

  private getPopularMedias(): void{
    this.mediaService.getPopularMedias(this.mediaCat).toPromise().then(
      data => {
        this.popularMedias = data.slice(0, 24);
        this.mediaGroupsMobile = this.divideMedias(1);
        this.mediaGroups = this.divideMedias(6);
      }
    )
  }

  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.popularMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.popularMedias[i]);
      }
      else {
        mediaGroups[j].push(this.popularMedias[i]);
      }
    }
    return mediaGroups;
  }
}
