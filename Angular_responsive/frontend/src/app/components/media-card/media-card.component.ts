import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {
  @Input() media
  @Input() isMobile
  constructor() { }
  display = false;
  displaySub = false;

  ngOnInit(): void {
  }
}
