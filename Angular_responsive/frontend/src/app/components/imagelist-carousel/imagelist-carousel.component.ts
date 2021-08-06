import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-imagelist-carousel',
  templateUrl: './imagelist-carousel.component.html',
  styleUrls: ['./imagelist-carousel.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})



export class ImagelistCarouselComponent implements OnInit {

  public carouselWidth = "1320px";


  @Input() mediaGroups: [];
  @Input() mediaGroupsMobile: [];
  @Input() isMobile: boolean;
  @Input() cardWidth;
  constructor(private _observer: BreakpointObserver) { }

  ngOnInit(): void {
    // this.carousel.pause();
    this._observer.observe(['(max-width: 350px)', '(max-width: 700px)']).subscribe(data=> {
      this.isMobile = data.matches;
      if (this.isMobile) {
        this.carouselWidth = "220px";
      }
    })
  }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

}
