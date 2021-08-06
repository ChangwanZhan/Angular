import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagelistCarouselComponent } from './imagelist-carousel.component';

describe('ImagelistCarouselComponent', () => {
  let component: ImagelistCarouselComponent;
  let fixture: ComponentFixture<ImagelistCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagelistCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagelistCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
