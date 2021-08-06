import {Component, Input, OnInit} from '@angular/core';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-similiar-media',
  templateUrl: './similiar-media.component.html',
  styleUrls: ['./similiar-media.component.css']
})
export class SimiliarMediaComponent implements OnInit {

  @Input() mediaCat: string;
  @Input() mediaId: string;
  @Input() isMobile: boolean;
  constructor(private mediaService: MediaService) { }

  title: string;

  ngOnInit(): void {
    this.generateTitle();
    this.getSimilarMedia();
  }

  similarMedias = [];
  mediaGroups = [];
  mediaGroupsMobile = [];

  private generateTitle(): void {
    if (this.mediaCat == "movie") {
      this.title = "Similar Movies"
    } else {
      this.title = "Similar TV Shows"
    }
  }

  private getSimilarMedia(): void{
    this.mediaService.getSimilarMedia(this.mediaCat, this.mediaId).toPromise().then(
      data => {
        this.similarMedias = data.slice(0, 24);

        console.log(this.similarMedias);
        this.mediaGroupsMobile = this.divideMedias(1);
        this.mediaGroups = this.divideMedias(6);
      }
    )
  }

  private divideMedias(mediaPerGroup): any{
    let j = -1;
    let mediaGroups = [];
    for (let i = 0; i < this.similarMedias.length; i++) {
      if (i % mediaPerGroup == 0) {
        j++;
        mediaGroups[j] = [];
        mediaGroups[j].push(this.similarMedias[i]);
      }
      else {
        mediaGroups[j].push(this.similarMedias[i]);
      }
    }
    return mediaGroups;
  }
}
