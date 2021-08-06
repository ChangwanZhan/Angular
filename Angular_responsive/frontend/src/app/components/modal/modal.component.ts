import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @Input() castInfo;
  @Input() castIds;
  @Input() profilePath: string;
  // @Input() isMobile;
  constructor(public activeModal: NgbActiveModal, private cdr: ChangeDetectorRef, private _observer: BreakpointObserver) { }

  homepage: string;
  public isMobile = false;

  ngAfterViewInit(): void {
    this.displaySocialMedia();
    this.displayHomepage();
    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
    })
    this.cdr.detectChanges();
  }

  private displayHomepage(): void {
    console.log(this.castInfo.homepage);
    if (this.castInfo.homepage == "N/A") {
      document.getElementById("homepage").style.display = "None";
    }
  }

  private displaySocialMedia(): void {
    if (this.castIds.imdb_id && this.castIds.imdb_id!=="") {
      document.getElementById("cast-imdb").style.display = "inline-block";
    } else {
      document.getElementById("cast-imdb").style.display = "None";
    }
    if (this.castIds.instagram_id && this.castIds.instagram_id!=="") {
      document.getElementById("cast-ins").style.display = "inline-block";
    } else {
      document.getElementById("cast-ins").style.display = "None";
    }
    if (this.castIds.facebook_id && this.castIds.facebook_id!=="") {
      document.getElementById("cast-fb").style.display = "inline-block";
    } else {
      document.getElementById("cast-fb").style.display = "None";
    }
    if (this.castIds.twitter_id && this.castIds.twitter_id!=="") {
      document.getElementById("cast-twitter").style.display = "inline-block";
    } else {
      document.getElementById("cast-twitter").style.display = "None";
    }
  }

}
