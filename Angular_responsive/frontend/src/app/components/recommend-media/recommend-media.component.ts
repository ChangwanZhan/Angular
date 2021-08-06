import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-recommend-media',
  templateUrl: './recommend-media.component.html',
  styleUrls: ['./recommend-media.component.css']
})
export class RecommendMediaComponent implements OnInit {

  @Input() mediaCat: string;
  @Input() mediaId: string;
  @Input() isMobile: boolean;

  constructor(private mediaService: MediaService) { }

  title: string;

  ngOnInit(): void {
    this.generateTitle();
    this.getRecommendMedias();
  }

  recommendMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private generateTitle(): void {
    if (this.mediaCat == "movie") {
      this.title = "Recommend Movies"
    } else {
      this.title = "Recommend TV Shows"
    }
  }

  private getRecommendMedias(): void{
    this.mediaService.getRecommendMedia(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        this.recommendMedias = data.slice(0, 24);
        this.mediaGroupsMobile = this.divideMedias(1);
        this.mediaGroups = this.divideMedias(6);
      }
    )
  }

  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.recommendMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.recommendMedias[i]);
      }
      else {
        mediaGroups[j].push(this.recommendMedias[i]);
      }
    }
    return mediaGroups;
  }

}
